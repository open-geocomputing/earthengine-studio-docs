#!/usr/bin/env node
// Regenerates the documentation data that must match the application exactly:
//   _data/studio_functions.json  AI assistant functions, read from the editor's
//                                TypeScript source (no hand-maintained copy).
//   _data/examples.json          the public example catalog manifest.
//   _data/studio.yml             the editor commit these docs were synced to.
//
// Usage:
//   node scripts/sync_studio_data.mjs [--editor ../eathengine.studio] [--examples ../earthengine-studio-examples]
//   node scripts/sync_studio_data.mjs --drift   # list editor commits since the last sync
//
// The editor checkout must have its dependencies installed (the TypeScript
// compiler is loaded from its node_modules). Nothing is executed from the
// editor: descriptors are read from the syntax tree.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? path.resolve(args[index + 1]) : fallback;
};
const editorDir = option("--editor", path.resolve(root, "../eathengine.studio"));
const examplesDir = option("--examples", path.resolve(root, "../earthengine-studio-examples"));
const studioDataPath = path.join(root, "_data/studio.yml");

const git = (cwd, ...gitArgs) => execFileSync("git", ["-C", cwd, ...gitArgs], { encoding: "utf8" }).trim();

function readSyncedCommit() {
  if (!existsSync(studioDataPath)) return null;
  const match = /^synced_commit:\s*"?([0-9a-f]{7,40})"?/m.exec(readFileSync(studioDataPath, "utf8"));
  return match ? match[1] : null;
}

if (args.includes("--drift")) {
  const synced = readSyncedCommit();
  if (!synced) {
    console.error("No synced_commit in _data/studio.yml; run the sync first.");
    process.exit(1);
  }
  const log = git(
    editorDir, "log", "--no-merges", "--format=%h %as %s", `${synced}..HEAD`, "--",
    "src", "docs", "README.md", "DOCUMENTATION.md", "CHANGES.md", "UI_API_COVERAGE.md",
    "PORTABLE_APP_EXPORT.md", "MANAGED_PUBLIC_APPS.md", "LOCAL_WORKSPACE.md",
  );
  const lines = log ? log.split("\n") : [];
  const userVisible = lines.filter((line) => /^\S+ \S+ (feat|fix)(\(|:|!)/.test(line));
  console.log(`Editor commits since docs sync ${synced}: ${lines.length} (${userVisible.length} feat/fix)`);
  for (const line of userVisible) console.log(`  ${line}`);
  process.exit(0);
}

// --- AI functions -----------------------------------------------------------

const requireFromEditor = createRequire(path.join(editorDir, "package.json"));
const ts = requireFromEditor("typescript");
const toolsDir = path.join(editorDir, "src/ai/tools");
const familiesSource = readFileSync(path.join(editorDir, "src/ai/functionFamilies.ts"), "utf8");

function familyTable() {
  const labels = new Map();
  for (const match of familiesSource.matchAll(/\{\s*id:\s*"([^"]+)",\s*label:\s*"([^"]+)"\s*\}/g)) {
    labels.set(match[1], match[2]);
  }
  const known = new Map();
  const knownBlock = /const knownFamilies[^{]*\{([\s\S]*?)\};/.exec(familiesSource)?.[1] ?? "";
  for (const match of knownBlock.matchAll(/"(studio\.[^"]+)":\s*"([^"]+)"/g)) known.set(match[1], match[2]);
  const keywords = [];
  const keywordBlock = /const familyKeywords[\s\S]*?=\s*\[([\s\S]*?)\n\];/.exec(familiesSource)?.[1] ?? "";
  for (const match of keywordBlock.matchAll(/\[\/(.+?)\/([a-z]*),\s*"([^"]+)"\]/g)) {
    keywords.push([new RegExp(match[1], match[2]), match[3]]);
  }
  return { labels, known, keywords };
}

function evaluateString(node, constants) {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return evaluateString(node.expression, constants);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = evaluateString(node.left, constants);
    const right = evaluateString(node.right, constants);
    return left === null || right === null ? null : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const value = evaluateString(span.expression, constants);
      if (value === null) return null;
      text += value + span.literal.text;
    }
    return text;
  }
  if (ts.isNumericLiteral(node)) return node.text;
  if (ts.isIdentifier(node) && constants.has(node.text)) return constants.get(node.text);
  if (ts.isCallExpression(node) || ts.isPropertyAccessExpression(node)) {
    // e.g. `${limit.toLocaleString("en-US")}`: fall back to the receiver.
    const target = ts.isCallExpression(node) ? node.expression : node;
    if (ts.isPropertyAccessExpression(target)) return evaluateString(target.expression, constants);
  }
  return null;
}

function collectConstants(sourceFile) {
  const constants = new Map();
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const value = evaluateString(node.initializer, constants);
      if (value !== null) constants.set(node.name.text, value);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return constants;
}

function readTools() {
  const families = familyTable();
  const tools = [];
  const warnings = [];
  const files = readdirSync(toolsDir).filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"));
  for (const file of files.sort()) {
    const text = readFileSync(path.join(toolsDir, file), "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const constants = collectConstants(sourceFile);
    const visit = (node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const props = new Map();
        for (const property of node.properties) {
          if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) {
            props.set(property.name.text, property.initializer);
          }
        }
        const name = evaluateString(props.get("name"), constants);
        if (name?.startsWith("studio.") && props.has("permission") && props.has("description")) {
          const description = evaluateString(props.get("description"), constants);
          if (description === null) warnings.push(`${file}: could not evaluate the description of ${name}`);
          const permission = evaluateString(props.get("permission"), constants);
          const declaredPolicy = evaluateString(props.get("defaultPolicy"), constants);
          const limitNode = props.get("conversationLimit");
          const limitText = limitNode ? evaluateString(limitNode, constants) : null;
          const declaredFamily = evaluateString(props.get("family"), constants);
          let familyId = declaredFamily?.toLowerCase() ?? families.known.get(name) ?? null;
          if (!familyId) {
            const keyword = families.keywords.find(([pattern]) => pattern.test(name.slice("studio.".length)));
            familyId = keyword ? keyword[1] : "other";
          }
          tools.push({
            name,
            family: familyId,
            family_label: families.labels.get(familyId) ?? familyId,
            permission,
            default_policy: declaredPolicy ?? (permission === "read" ? "allow" : "ask"),
            conversation_limit: limitText === null ? null : Number(limitText),
            can_skip_wait: props.get("canSkipWait")?.kind === ts.SyntaxKind.TrueKeyword,
            description: description?.replace(/\s+/g, " ").trim() ?? "",
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
  const order = [...families.labels.keys()];
  tools.sort((a, b) => (order.indexOf(a.family) - order.indexOf(b.family)) || a.name.localeCompare(b.name));
  return { tools, warnings, families: order.map((id) => ({ id, label: families.labels.get(id) })) };
}

const { tools, warnings, families } = readTools();
if (tools.length === 0) {
  console.error(`No Studio AI functions found under ${toolsDir}.`);
  process.exit(1);
}
const usedFamilies = families.filter((family) => tools.some((tool) => tool.family === family.id));
writeFileSync(
  path.join(root, "_data/studio_functions.json"),
  `${JSON.stringify({ families: usedFamilies, functions: tools }, null, 2)}\n`,
);

// --- Example catalog --------------------------------------------------------

const manifest = JSON.parse(readFileSync(path.join(examplesDir, "manifest.json"), "utf8"));
const exampleRepository = "https://github.com/open-geocomputing/earthengine-studio-examples";
const exampleRef = "master";
const studioUrl = "https://code.earthengine.studio/";
const hiddenGroups = new Set(["tests"]);
const groups = manifest.groups
  .filter((group) => !hiddenGroups.has(group.id))
  .map((group) => ({
    id: group.id,
    title: group.title,
    examples: group.examples.map((example) => {
      const open = new URL(studioUrl);
      open.searchParams.set("repo", exampleRepository);
      open.searchParams.set("repo_ref", exampleRef);
      open.searchParams.set("repo_path", example.path);
      return {
        id: example.id,
        title: example.title,
        summary: example.summary,
        language: example.path.endsWith(".py") ? "Python" : "JavaScript",
        open_url: open.toString(),
        source_url: `${exampleRepository}/blob/${exampleRef}/${example.path}`,
      };
    }),
  }));
writeFileSync(path.join(root, "_data/examples.json"), `${JSON.stringify({ repository: exampleRepository, groups }, null, 2)}\n`);

// --- Sync stamp -------------------------------------------------------------

const editorCommit = git(editorDir, "rev-parse", "--short=12", "HEAD");
const editorDate = git(editorDir, "show", "-s", "--format=%cs", "HEAD");
const examplesCommit = git(examplesDir, "rev-parse", "--short=12", "HEAD");
writeFileSync(
  studioDataPath,
  [
    "# Written by scripts/sync_studio_data.mjs. Do not edit by hand.",
    `synced_commit: "${editorCommit}"`,
    `synced_date: ${editorDate}`,
    `examples_commit: "${examplesCommit}"`,
    "",
  ].join("\n"),
);

const exampleCount = groups.reduce((total, group) => total + group.examples.length, 0);
console.log(`Synced ${tools.length} AI functions and ${exampleCount} examples from editor ${editorCommit} (${editorDate}).`);
for (const warning of warnings) console.warn(`warning: ${warning}`);
if (warnings.length > 0) process.exitCode = 2;
