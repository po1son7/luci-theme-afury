# luci-theme-afury

[中文](#中文) · [English](#english)

OpenWrt **25.12** / ImmortalWrt 的 LuCI 主题。画布纯白或纯黑，1px 发丝线，主操作是墨色，青色 `#0496D4` 只画在字标 A 的横杠上。

下面截图来自本地 `preview/`，是演示文案，不是真机。

---

## 中文

独立主题包。静态资源在 `/luci-static/afury`，ucode 模板在 `themes/afury`。装上后 LuCI 会列出三个名字：

| 名称 | 路径 | 外观 |
|------|------|------|
| **Afury** | `/luci-static/afury` | 跟随系统 `prefers-color-scheme` |
| **AfuryDark** | `/luci-static/afury-dark` | 强制深色 |
| **AfuryLight** | `/luci-static/afury-light` | 强制浅色 |

`/etc/uci-defaults/90_luci-theme-afury` 排在 bootstrap 的 `30_` 之后，会把默认主题设成 Afury。

### 截图

登录（深色 / 浅色）：

![登录 深色](docs/login-dark.png)
![登录 浅色](docs/login-light.png)

概览（深色 / 浅色）：

![概览 深色](docs/overview-dark.png)
![概览 浅色](docs/overview-light.png)

表单（深色）：

![无线表单 深色](docs/form-dark.png)

### 现在长什么样

- 顶栏是 Afury 字标；右侧是主机名和深浅切换
- 登录页只放字标，不用「需要授权」当标题
- 概览先是四格 hero：运行时间、CPU、内存、存储，再是系统 / 端口 / 网络
- 端口状态卡、应用配置提示框按卡片居中，不贴左上角
- LuCI 自带网卡 / 信号图标换成线框 SVG
- 主按钮墨色压画布；中文标签不加字距、不大写
- 拉丁字用 Geist，中文走系统黑体

色板、圆角和禁止项见 [DESIGN.md](DESIGN.md)。

### 要求

- OpenWrt **25.12** 或同代 ImmortalWrt（ucode 模板的 LuCI）
- `luci-base`
- 不要和 Argon 等旧主题抢默认 `mediaurlbase`

### 编进固件

把本目录拷进 OpenWrt 树：

```sh
cp -a luci-theme-afury package/luci-theme-afury
```

Windows 检出时先把 Makefile、`*.sh`、`*.ut`、`*.js` 的 CRLF 收成 LF，再 `make`。

`.config`：

```
CONFIG_PACKAGE_luci-theme-afury=y
# CONFIG_PACKAGE_luci-theme-argon is not set
```

装完后这些路径会在：

```
/www/luci-static/afury/
/www/luci-static/afury-dark/
/www/luci-static/afury-light/
/www/luci-static/resources/menu-afury.js
/usr/share/ucode/luci/template/themes/afury/
/etc/uci-defaults/90_luci-theme-afury
```

热更新只改 `/www` 和 ucode 模板不够：下次 `sysupgrade` 会用镜像里的包盖回去。要进固件，必须重新编译本包再出镜像。

### 本地预览

在本目录：

```sh
python -m http.server 8765
```

打开 <http://127.0.0.1:8765/preview/>。`?dark=1` / `?dark=0` 可强制深色或浅色。

### 许可

[Apache License 2.0](LICENSE)

---

## English

A standalone LuCI theme. Assets live at `/luci-static/afury`; templates live at `themes/afury`. LuCI lists three names:

| Name | Path | Mode |
|------|------|------|
| **Afury** | `/luci-static/afury` | Follow `prefers-color-scheme` |
| **AfuryDark** | `/luci-static/afury-dark` | Forced dark |
| **AfuryLight** | `/luci-static/afury-light` | Forced light |

`/etc/uci-defaults/90_luci-theme-afury` runs after bootstrap’s `30_` and sets Afury as the default.

### Screenshots

Login (dark / light):

![Login dark](docs/login-dark.png)
![Login light](docs/login-light.png)

Overview (dark / light):

![Overview dark](docs/overview-dark.png)
![Overview light](docs/overview-light.png)

Form (dark):

![Wireless form dark](docs/form-dark.png)

### Look

- Top bar is the wordmark. Hostname and the mode toggle sit on the right.
- Login is the wordmark. Do not use LuCI “Authorization Required” as a title.
- Overview starts with a four-cell hero (uptime, CPU, memory, storage), then System / Ports / Network.
- Port-status cards and the UCI apply dialog stay centered as cards. They do not pin to the top-left.
- Stock LuCI network / signal icons are remapped to hairline SVGs.
- Primary actions are ink on canvas. Chinese labels stay as-is: no letter-spacing, no uppercase.
- Geist for Latin; CJK falls through to the system sans.

Tokens and don’ts: [DESIGN.md](DESIGN.md).

### Requirements

- OpenWrt **25.12** or a matching ImmortalWrt (ucode LuCI)
- `luci-base`
- Do not fight Argon (or similar) for `luci.main.mediaurlbase`

### Build into a firmware

Copy this tree into the OpenWrt build:

```sh
cp -a luci-theme-afury package/luci-theme-afury
```

On Windows checkouts, strip CRLF from Makefile, `*.sh`, `*.ut`, and `*.js` before `make`.

`.config`:

```
CONFIG_PACKAGE_luci-theme-afury=y
# CONFIG_PACKAGE_luci-theme-argon is not set
```

After install:

```
/www/luci-static/afury/
/www/luci-static/afury-dark/
/www/luci-static/afury-light/
/www/luci-static/resources/menu-afury.js
/usr/share/ucode/luci/template/themes/afury/
/etc/uci-defaults/90_luci-theme-afury
```

A live push to `/www` is not enough. The next `sysupgrade` puts the image copy back. Rebuild this package into the image if the theme should survive a flash.

### Local preview

From this directory:

```sh
python -m http.server 8765
```

Open <http://127.0.0.1:8765/preview/>. Use `?dark=1` / `?dark=0` to force a mode.

### License

[Apache License 2.0](LICENSE)
