(() => {
  const root = document.documentElement;
  const body = document.body;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const menuButtons = document.querySelectorAll("[data-menu-toggle]");
  const searchDialog = document.querySelector("[data-search-dialog]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const searchHint = document.querySelector("[data-search-hint]");
  let searchIndex = null;

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    if (persist) {
      root.dataset.themeSource = "saved";
      try { localStorage.setItem("studio-docs-theme", theme); } catch { /* The active page still changes theme. */ }
    }
    themeButton?.setAttribute("aria-label", `Switch to ${theme === "night" ? "Day" : "Night"} theme`);
  };

  themeButton?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "night" ? "day" : "night", true);
  });
  applyTheme(root.dataset.theme || "day");
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (root.dataset.themeSource === "system") applyTheme(event.matches ? "night" : "day");
  });

  const setMenu = (open) => {
    body.classList.toggle("menu-open", open);
    menuButtons.forEach((button) => button.setAttribute("aria-expanded", String(open)));
  };
  menuButtons.forEach((button) => button.addEventListener("click", () => setMenu(!body.classList.contains("menu-open"))));
  document.querySelectorAll(".docs-sidebar a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  const loadSearch = async () => {
    if (searchIndex) return searchIndex;
    const response = await fetch(`${document.documentElement.dataset.baseurl || ""}/search.json`);
    if (!response.ok) throw new Error("Search index could not be loaded.");
    searchIndex = await response.json();
    return searchIndex;
  };

  const closeSearch = () => {
    if (!searchDialog) return;
    searchDialog.hidden = true;
    body.classList.remove("search-open");
  };

  const openSearch = async () => {
    if (!searchDialog || !searchInput) return;
    searchDialog.hidden = false;
    body.classList.add("search-open");
    searchInput.focus();
    try {
      await loadSearch();
    } catch (error) {
      if (searchHint) searchHint.textContent = error instanceof Error ? error.message : "Search is unavailable.";
    }
  };

  const escapeHtml = (value) => value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
  const renderSearch = async () => {
    if (!searchInput || !searchResults || !searchHint) return;
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = "";
      searchHint.hidden = false;
      return;
    }
    const terms = query.split(/\s+/).filter(Boolean);
    const entries = await loadSearch();
    const matches = entries.map((entry) => {
      const title = entry.title.toLowerCase();
      const summary = `${entry.description} ${entry.keywords}`.toLowerCase();
      const content = entry.content.toLowerCase();
      const matched = terms.every((term) => title.includes(term) || summary.includes(term) || content.includes(term));
      const score = terms.reduce((total, term) => total + (title.includes(term) ? 8 : 0) + (summary.includes(term) ? 3 : 0) + (content.includes(term) ? 1 : 0), 0);
      return { entry, matched, score };
    }).filter((result) => result.matched).sort((a, b) => b.score - a.score).slice(0, 8);

    searchHint.hidden = true;
    searchResults.innerHTML = matches.length
      ? matches.map(({ entry }) => `<a class="search-result" href="${entry.url}"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(entry.description)}</span></a>`).join("")
      : `<p class="search-hint">No guide matched “${escapeHtml(searchInput.value.trim())}”. Try a panel or workflow name.</p>`;
  };

  document.querySelectorAll("[data-search-trigger]").forEach((button) => button.addEventListener("click", openSearch));
  document.querySelectorAll("[data-search-close]").forEach((button) => button.addEventListener("click", closeSearch));
  searchInput?.addEventListener("input", () => { void renderSearch(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchDialog && !searchDialog.hidden) closeSearch();
    if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !/input|textarea/i.test(document.activeElement?.tagName || "")) {
      event.preventDefault();
      void openSearch();
    }
  });

  document.querySelectorAll(".doc-content .highlighter-rouge").forEach((block) => {
    const code = block.querySelector("code");
    if (!code) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent || "");
        button.textContent = "Copied";
      } catch {
        button.textContent = "Select to copy";
      }
      window.setTimeout(() => { button.textContent = "Copy"; }, 1600);
    });
    block.append(button);
  });

  const toc = document.querySelector("[data-page-toc]");
  if (toc) {
    const headings = [...document.querySelectorAll("[data-doc-content] h2, [data-doc-content] h3")];
    if (headings.length < 2) toc.closest(".page-toc")?.remove();
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent || "Section";
      link.className = heading.tagName === "H3" ? "toc-h3" : "toc-h2";
      toc.append(link);
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = String(new Date().getFullYear()); });
})();
