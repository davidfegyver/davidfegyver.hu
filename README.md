# davidfegyver.hu

Source for [davidfegyver.hu](https://davidfegyver.hu) — a Hugo site on a customised [terminal](https://github.com/panr/hugo-theme-terminal) theme, built and deployed to GitHub Pages by `.github/workflows/hugo.yaml` on every push to `main`.

## Drafts stay local

This repository is public, so anything committed here is readable by anyone — **including posts marked `draft = true`**. Hugo's draft flag keeps a post off the built site; it does not keep it off GitHub.

So: write drafts in your local working copy and commit a post only when it's ready to be public. Don't commit `draft = true` files.

```bash
hugo new content posts/my-post.md   # stays local
hugo server -D                      # preview drafts at localhost:1313
git add content/posts/my-post.md    # only when publishing
```

## Local development

```bash
hugo server -D
```

Needs Hugo **extended** ≥ 0.137.1 and Dart Sass — the build uses SCSS, so the standard (non-extended) binary will fail.

## Layout

| Path | Purpose |
|---|---|
| `content/` | Posts and pages |
| `layouts/` | Templates, partials, shortcodes (`code`, `image`, `spotify`) |
| `assets/` | SCSS and JS, pipelined by Hugo |
| `static/` | Copied verbatim, including `CNAME` for the custom domain |
| `config/_default/` | Base config; `config/production/` overrides `baseURL` |
