# 合掌 HTML → EXE / APK

在仓库根目录双击 **`打包游戏.cmd`**。脚本从 `合掌网页版-正式版本存档/` 按数字版本号选取最新的 `合掌网页版v*.html`，生成两种应用：

- Windows x64：单文件 EXE，使用系统 WebView2，不附带浏览器。
- 安卓 8.0 及以上：签名 APK，使用系统 Android WebView，不附带浏览器。

游戏 HTML 原文件不会被改写；其完整内容分别嵌入 EXE 和 APK。打包不改变规则，不增加联机能力。

## 常用命令

在仓库根目录运行：

```powershell
# 自动选取最新正式存档，同时打包两端
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-apps.ps1

# 指定 HTML；版本号从文件名末尾的 v2.5.8.2 自动读取
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-apps.ps1 -Html "合掌网页版-正式版本存档/合掌网页版v2.5.8.2.html"

# 只生成其中一种
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-apps.ps1 -Target windows
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-apps.ps1 -Target android

# 任意文件名必须显式指定版本
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-apps.ps1 -Html "D:/游戏/新版.html" -Version 2.5.9
```

产物在 `dist/apps/<版本>/`，包含 EXE、APK 和本次打包清单 `build-all.json`（单平台时为 `build-windows.json` 或 `build-android.json`）。清单记录原 HTML 和产物的 SHA-256，便于核对玩家使用的版本。

脚本面向本项目的**自包含单 HTML**，不是任意网站转换器。独立 CSS、JS、图片文件和网络资源需要先内嵌；应用外壳不会把整个 HTML 所在目录打进去。应用名称为“合掌”，安卓包名固定为 `com.midshow.hezhang`；不要用同一外壳为不同游戏打包，否则会共用应用身份。

## 首次环境与下载

- 打包电脑：64 位 Windows、Windows PowerShell 5.1、.NET Framework 4.6.2 或更新版本。
- 安卓编译另需 JDK 17 或更新版本。脚本检查 `JAVA_HOME`、PATH 和 `C:/Program Files/Java`，无需 Android Studio、Gradle 或 Node.js。
- 首次自动从微软 NuGet 下载固定版本 WebView2 SDK，从 Google 下载 Android Platform 35 和 Build Tools 35.0.0，核对固定校验值后解压；安卓两个下载包合计约 120 MB。
- 依赖缓存在 `.cache/native-pack/`。缓存齐全后再次构建不需要联网；可删除缓存以释放空间，下次会重新下载。
- Google SDK 使用条款见 [Android SDK 条款](https://developer.android.com/studio/terms)，SDK 自带的许可文件保留在缓存中。

Windows 玩家需要 .NET Framework 4.6.2+ 和 [WebView2 Evergreen 运行库](https://developer.microsoft.com/microsoft-edge/webview2/)。未安装时 EXE 会给出提示，不会自动安装。具备运行库后，游戏可离线运行。安卓玩家需具备可用且较新的系统 WebView。

## 后续迭代与签名备份

1. 将新版自包含 HTML 放入正式存档目录，文件名使用 `合掌网页版v2.5.9.html` 等数字版本格式。
2. 再次双击 `打包游戏.cmd`。
3. 分发新 EXE / APK。EXE 可放在任意目录；安卓用新 APK 覆盖安装。

**务必私下备份整个 `local-archive/packaging-signing/` 文件夹。** 首次 APK 构建会生成本地分发签名及随机密码，后续复用。同一设备上的覆盖安装要求使用相同包名、签名和不降低的版本号。丢失签名后无法用新密钥覆盖旧应用；不要将密钥、密码随安装包发送或提交 Git。该目录已由仓库现有 `.gitignore` 排除。

默认安卓 `versionCode` 按四段版本计算：`主版本×1000000 + 次版本×10000 + 第三段×100 + 第四段`；每段 0–99，缺失段补 0。因此 `2.5.8.2 → 2050802`，`2.5.9 → 2050900`。特殊情况下可传 `-VersionCode`，并自行保证不倒退。更改外壳但沿用同一游戏版本时，建议也增加第四段版本号。

Windows 设置与本地游戏数据保存在 `%LOCALAPPDATA%/Hezhang/profile/`；安卓保存在应用私有 WebView 数据中。覆盖升级保持这些位置不变，卸载或清除应用数据会丢失设置。现有游戏不持久保存进行中的对局，本外壳不额外添加续局功能。

Windows EXE 未购买商业代码签名证书；APK 使用本地生成的固定分发签名。这些是可直接分发的离线应用，不是应用商店发布配置。

## 外壳行为

- Windows 使用固定本地 HTTPS 来源加载内嵌文件，Blob 下载交给 WebView2 的下载功能。
- Windows EXE 内嵌 PerMonitorV2 高 DPI 声明，按显示器缩放比例绘制，避免系统将低分辨率窗口整体拉伸；切换显示器时更新窗口尺寸。
- 安卓使用本地 HTTPS 请求拦截加载资产，启用 JavaScript 和本地存储，不允许文件 URL 访问或跳转外部页面。
- 安卓返回键优先关闭游戏弹窗，无弹窗时确认退出；适配状态栏、导航栏和屏幕旋转。
- 安卓战报 PNG 使用系统“另存为”窗口导出，不申请相册或整个文件系统的权限。
- 如以后接入联机，需明确配置允许访问的服务地址和鉴权；目前安卓外壳会拦截未注册的资源请求。

## 验证

构建会检查每条编译命令退出状态，并执行 APK 签名验证与 ZIP 对齐验证。

Windows 冒烟测试（额外需要 Playwright；打包本身不依赖它）：

```powershell
# NODE_PATH 指向已安装 Playwright 的 node_modules，或在本地测试环境安装它
node tools/native-pack/smoke-windows.cjs "dist/apps/2.5.8.2/Hezhang-2.5.8.2-windows-x64.exe"
```

此检查运行真实 EXE，使用独立测试 WebView2 用户目录，验证窗口处于 PerMonitorV2 模式、网页像素比例与窗口 DPI 一致，以及内置自检、本地存储重载和实际多人帮闪按钮流程，截图保存在 `output/native-pack/windows.png`。

APK 的编译和签名验证不等于真机验收；分发前在安卓设备上确认首页、单人/多人对局、返回键、横竖屏、保存战报及覆盖升级保留设置。
