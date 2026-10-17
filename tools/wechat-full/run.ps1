[CmdletBinding()]
param(
    [ValidateSet('build','server')][string]$Mode = 'build',
    [switch]$Lan
)
$ErrorActionPreference = 'Stop'
$repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$nodeRuntime = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' }
if (!(Test-Path -LiteralPath $nodeRuntime)) { throw 'Node.js 20+ is required. Install it and retry.' }
function Run-Node([string[]]$Arguments) {
    & $nodeRuntime @Arguments
    if ($LASTEXITCODE -ne 0) { throw "Node.js exited with code $LASTEXITCODE" }
}
Push-Location -LiteralPath $repo
try {
    if ($Mode -eq 'server') {
        $env:HEZHANG_HOST = if ($Lan) { '0.0.0.0' } else { '127.0.0.1' }
        $env:HEZHANG_PORT = '3238'
        if ($Lan) {
            Write-Host 'LAN mode. Use an address below on a phone connected to the same Wi-Fi:'
            Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
                Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.IPAddress -notlike '169.254.*' } |
                ForEach-Object { Write-Host ("http://{0}:3238 ({1})" -f $_.IPAddress, $_.InterfaceAlias) }
        }
        Write-Host 'Keep this window open. Ctrl+C stops the server and ends its rooms.'
        Run-Node @('online-server/server.mjs')
    } else {
        if (!(Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules/webpack'))) {
            $pnpmRuntime = Join-Path (Split-Path (Split-Path $nodeRuntime -Parent) -Parent) 'node_modules/pnpm/bin/pnpm.cjs'
            if (Test-Path -LiteralPath $pnpmRuntime) {
                Run-Node @($pnpmRuntime, '--dir', $PSScriptRoot, 'install', '--frozen-lockfile', '--ignore-scripts', '--store-dir', (Join-Path $repo '.cache/pnpm-store'))
            } else {
                throw 'Build dependencies are missing. In tools/wechat-full run: pnpm install --frozen-lockfile'
            }
        }
        Run-Node @('tools/wechat-full/build.cjs')
        Run-Node @('tools/wechat-full/check-compile.cjs')
        Run-Node @('tools/wechat-full/check-adapter.cjs')
        Run-Node @('tools/wechat-full/check-interactions.cjs')
        Run-Node @('tools/wechat-full/check-online.cjs')
        Write-Host 'Build and checks passed. Recompile the existing project in WeChat DevTools.'
    }
} finally { Pop-Location }
