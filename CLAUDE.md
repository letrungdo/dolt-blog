# dolt-blog

## Post cover images

Covers live in `content/images/<year>/<month>/<slug>-cover.png`, 1200×630 PNG, referenced from the post's `cover:` frontmatter (both language versions use the same image).

**Every new cover must use a visual style that is not already in the log below.** Do not reuse a previous layout as a template, even with new colors or text. A different style means at least a different layout *and* a different color scheme/typography.

Before making a cover:
1. Read the log below and open the most recent covers to see what is taken.
2. Pick a style that fits the post's content (e.g. a chart for a cost comparison, a terminal for an error-fix post).
3. After the cover is done, add a row to the log.

Ways to vary: light vs dark background, serif vs sans vs mono headline, chart / diagram / terminal / code / illustration / photo-style / big-number / split-screen layouts, single accent color vs gradient.

## Charts in posts

For simple comparisons (prices, timings, sizes), use the reusable HTML bar chart styled in `content/styles/customize.scss` (`.bar-chart`) instead of an image, so the numbers stay readable, indexable and responsive. Keep the HTML block free of blank lines (markdown ends the HTML block at a blank line). Bar width = value / max value in that chart, as a percentage; sort rows ascending; one series per chart. Example: the cost charts in `content/posts/2026/2026-10-27-mobile-ci-cd-comparison-*.md`.

```html
<figure class="bar-chart">
<figcaption class="bar-chart-title">Chart title (unit)</figcaption>
<div class="bar-chart-row" title="Name: $40/month"><span class="bar-chart-label">Name<small>optional sub-label</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:14.6%"></span></span><span class="bar-chart-value">$40</span></div>
<p class="bar-chart-note">How the numbers were calculated.</p>
</figure>
```

## Cover style log

| Date | Cover | Style (layout, colors, type) |
|---|---|---|
| 2026-10-13 | `2026/10/e2e-testing-cover.png` | Dark navy gradient, blue pill tag, sans title with blue second line, 3 stat cards with colored top bars |
| 2026-10-26 | `2026/10/azure-self-hosted-agent-cover.png` | Same template as above (dark navy, pill tag, 3 stat cards) — do not reuse |
| 2026-10-27 | `2026/10/mobile-ci-cd-comparison-cover.png` | Light cream editorial: orange left edge stripe, large black serif title with orange italic word, mono kicker, framed horizontal bar chart on the right |
