# Afury

LuCI theme. The model is a **CPE product console** in the **Vercel / Geist** language: white/black, hairline, high contrast, black primary. Not Linear (lavender, near-black tool), not glass. The product name is **Afury**. LuCI class/DOM is a runtime contract, not a visual one.

Install paths: `/luci-static/afury`, `themes/afury`. UCI names are Afury / AfuryDark / AfuryLight.

## Tokens

| Role | Dark | Light | LuCI / H5000M mapping |
|------|------|-------|------------------------|
| bg (canvas) | `#000000` | `#FFFFFF` | `--background-color-high`, `--h5m-surface` |
| surface (card) | `#000000` | `#FFFFFF` | `--rect-surface` |
| ink | `#FFFFFF` | `#000000` | `--text-color-highest`, `--text-color-high` |
| muted | `#888888` | `#666666` | `--text-color-medium`, `--text-color-secondary`, `--h5m-muted` |
| line | `#333333` | `#EAEAEA` | `--border-color-medium`, `--h5m-line` |
| accent | `#0496D4` | `#0496D4` | `--primary-color-high`, `--h5m-accent` |
| accent2 | `#35B7EA` | `#0EA5E9` | `--primary-color-medium` |
| ok | `#34C759` | `#248A3D` | `--success-color-high`, `--h5m-ok` |
| danger | `#C81E1E` | `#C81E1E` | `--error-color-high` |
| warn | `#E6A817` | `#E6A817` | `--warn-color-high`, `--h5m-warn` |
| radius-sm / md / lg | `2 / 2 / 2` | same | `--rect-radius-*`, `--h5m-radius` |
| elev-1 | none (hairline only) | none | `--rect-elev-1` |

## Rules

- Canvas is white or black. Cards are the same surface plus a 1px hairline. No elevation, no glass.
- Radius scale: 2px on cards and controls. No pill buttons.
- The face is the **Afury wordmark**, inlined so `currentColor` follows ink in both modes. The A crossbar is `#0496D4`; the rest follows ink. No icon, no cyan rail. Do not load the mark as `<img>` (external SVG cannot inherit color).
- Login face is the wordmark. Do not use LuCI 「需要授权」 as a title.
- Footer does not name LuCI or OpenWrt.
- Chrome is a Vercel top bar, not a left spine. Dropdowns are click panels. Menu hover uses `--rect-hover` / `--rect-hover-strong` (not a 6% wash). No dotted focus rings. Every page gets the section kicker (overview stays 「设备」). Tables, action cells, status labels, and logs follow the same tokens. LuCI network/status icons remap to Geist monoline marks; dark mode inverts them. Do not restyle modem / H5000M custom pages.
- Overview IA: hero first (uptime / CPU / memory / storage), then 系统 / 端口 / 网络, then the rest. Hero uptime drops seconds (poll is not 1s). Memory big number is occupancy (100 − 可用), not 可用 itself. CPU reads `/proc/stat` plus load. Port cards stay a packed grid (not stretched to both edges); apply/wait dialogs are centered cards. 「隐藏」 still far right on remaining cards; bars stay `width: 100%`.
- Cyan `#0496D4` only on the wordmark bar. Primary actions, progress, and tabs use ink, not cyan.
- Primary button is ink on canvas (black on white / white on black). Secondary is hairline. Do not invert on hover.
- No glass, no backdrop-filter, no chrome gradients.
- Section is the card. Do not stroke every inner widget.
- Top bar brand is the wordmark. Hostname sits on the right with the theme toggle. Login and the tab icon use the same mark (tab uses the cropped A).
- Fonts: Geist for Latin; CJK falls through to PingFang / YaHei.
- Chinese labels stay as-is. No letter-spacing or uppercase on Chinese.

## Variants

| UCI name | mediaurlbase | Dark mode |
|----------|--------------|-----------|
| Afury | `/luci-static/afury` | follow `prefers-color-scheme` |
| AfuryDark | `/luci-static/afury-dark` | forced on |
| AfuryLight | `/luci-static/afury-light` | forced off |
