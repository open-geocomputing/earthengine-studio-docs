---
layout: home
title: Earth Engine Studio Documentation
description: Learn how to work with code, maps, data, repositories, assets, figures, and exports in Earth Engine Studio.
permalink: /
---

<section class="home-hero">
  <div class="home-grid" aria-hidden="true"></div>
  <div class="home-glow" aria-hidden="true"></div>
  <div class="home-hero-inner">
    <div>
      <p class="eyebrow">Earth Engine Studio documentation</p>
      <h1>From planetary data<br>to <span>working insight.</span></h1>
      <p class="home-lede">Learn the complete Studio workflow: discover data, write JavaScript or Python, inspect maps and figures, organize code in repositories, and deliver cloud or local results.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="{{ '/getting-started/' | relative_url }}">Start with the first workflow →</a>
        <button class="button button-secondary" type="button" data-search-trigger>Search documentation</button>
      </div>
      <p class="hero-foundation">Earth Engine Studio is an independent workspace built on <a href="https://earthengine.google.com/">Google Earth Engine</a>. It is not an official Google product.</p>
    </div>
    <div class="hero-orbit" aria-hidden="true">
      <span class="orbit-line"></span>
      <img src="{{ '/assets/images/orbit-studio.svg' | relative_url }}" width="330" height="330" alt="">
      <div class="orbit-chip chip-code"><strong>JavaScript + Python</strong>One browser workspace</div>
      <div class="orbit-chip chip-map"><strong>Map + Console + Tasks</strong>Outputs stay close to code</div>
    </div>
  </div>
</section>

<section class="home-section">
  <div class="section-inner">
    <div class="section-heading">
      <div><p class="eyebrow">Choose a workflow</p><h2>Find the guide that matches the work.</h2></div>
      <p>Studio keeps familiar Earth Engine ideas while expanding the workspace around them. Start with a first script or jump directly to the panel you need.</p>
    </div>
    <div class="guide-grid">
      <a class="guide-card" href="{{ '/getting-started/' | relative_url }}"><span>01</span><h3>Run a first analysis</h3><p>Connect a project, open an example, execute JavaScript or Python, and read the result.</p></a>
      <a class="guide-card" href="{{ '/editor/' | relative_url }}"><span>02</span><h3>Write and organize code</h3><p>Use completion, mixed-language modules, selections, repository saves, and immutable links.</p></a>
      <a class="guide-card" href="{{ '/maps-and-geometries/' | relative_url }}"><span>03</span><h3>Explore on the map</h3><p>Render layers, switch providers and basemaps, inspect pixels, and manage geometry workspaces.</p></a>
      <a class="guide-card" href="{{ '/console-and-plots/' | relative_url }}"><span>04</span><h3>Study outputs</h3><p>Expand structured Console values and open Plotly, chart, or Matplotlib figure tabs.</p></a>
      <a class="guide-card" href="{{ '/tasks-and-exports/' | relative_url }}"><span>05</span><h3>Deliver results</h3><p>Review cloud export tasks or stream large raster and table downloads to local storage.</p></a>
      <a class="guide-card" href="{{ '/repositories-and-sharing/' | relative_url }}"><span>06</span><h3>Connect repositories</h3><p>Work with GitHub, GitLab, and GoogleSource while retaining branch and revision context.</p></a>
    </div>
  </div>
</section>

<section class="home-section comparison-section">
  <div class="section-inner">
    <div class="section-heading">
      <div><p class="eyebrow">Built on a strong foundation</p><h2>Familiar engine.<br>Expanded studio.</h2></div>
      <p>Google Earth Engine remains the computation and data platform. Studio builds a separate, open workspace around it and intentionally changes some editor workflows.</p>
    </div>
    <div class="comparison-table" role="table" aria-label="Comparison of Google Earth Engine Code Editor and Earth Engine Studio">
      <div class="comparison-row comparison-head" role="row"><div role="columnheader">Area</div><div role="columnheader">Google Code Editor</div><div role="columnheader">Earth Engine Studio</div></div>
      <div class="comparison-row" role="row"><div role="cell"><strong>Languages</strong></div><div role="cell"><strong>JavaScript workspace</strong><p>Google's browser editor centers on the Earth Engine JavaScript API.</p></div><div role="cell"><strong>JavaScript and Python</strong><p>Both execute in browser workers and can share portable bindings.</p></div></div>
      <div class="comparison-row" role="row"><div role="cell"><strong>Maps</strong></div><div role="cell"><strong>Google map display</strong><p>Code Editor map tools and the familiar <code>Map</code> API.</p></div><div role="cell"><strong>Provider-neutral maps</strong><p>MapLibre, OpenLayers, or optional Google Maps behind a shared API.</p></div></div>
      <div class="comparison-row" role="row"><div role="cell"><strong>Code storage</strong></div><div role="cell"><strong>GoogleSource repositories</strong><p>Scripts are organized in Code Editor repositories.</p></div><div role="cell"><strong>Multiple Git providers</strong><p>GitHub, GitLab, GoogleSource, and public web repositories.</p></div></div>
      <div class="comparison-row" role="row"><div role="cell"><strong>Outputs</strong></div><div role="cell"><strong>Map, Console, charts, Tasks</strong><p>Core Earth Engine inspection and export patterns.</p></div><div role="cell"><strong>Plus figures and local delivery</strong><p>Plotly, Matplotlib, multiple maps, and high-volume folder or ZIP downloads.</p></div></div>
    </div>
  </div>
</section>

<section class="home-cta">
  <img src="{{ '/assets/images/orbit-studio.svg' | relative_url }}" width="82" height="82" alt="">
  <p class="eyebrow">Ready when you are</p>
  <h2>Open the workspace and make the first run.</h2>
  <p>No local install is required for normal Studio use.</p>
  <a class="button button-primary" href="https://code.earthengine.studio/">Open Earth Engine Studio ↗</a>
</section>
