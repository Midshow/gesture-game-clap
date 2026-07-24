$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceHtml = Get-Content -LiteralPath (Join-Path $projectRoot 'index.html') -Raw -Encoding UTF8
$sourceCss = Get-Content -LiteralPath (Join-Path $projectRoot 'styles.css') -Raw -Encoding UTF8

$scriptFiles = @(
  'js/moves.js',
  'js/combat.js',
  'js/skills.js',
  'js/ai.js',
  'js/storage.js',
  'js/ui.js',
  'js/app.js'
)

$bundleParts = foreach ($relativePath in $scriptFiles) {
  $source = Get-Content -LiteralPath (Join-Path $projectRoot $relativePath) -Raw -Encoding UTF8
  $source = [regex]::Replace($source, '(?m)^\s*import\s+.+?;\s*$', '')
  $source = [regex]::Replace($source, '(?m)^\s*export\s*\{\s*\$\s*\};\s*$', '')
  $source = [regex]::Replace($source, '\bexport\s+(?=(const|let|var|function|class)\b)', '')
  "`n/* $relativePath */`n$source"
}

$bundle = $bundleParts -join "`n"
$sourceHtml = [regex]::Replace($sourceHtml, '(?m)^\s*<link rel="manifest"[^>]*>\s*$', '')
$sourceHtml = [regex]::Replace($sourceHtml, '(?m)^\s*<link rel="stylesheet"[^>]*>\s*$', "  <style>`n$sourceCss`n  </style>")
$sourceHtml = [regex]::Replace($sourceHtml, '(?m)^\s*<meta property="og:image"[^>]*>\s*$', '')
$sourceHtml = [regex]::Replace(
  $sourceHtml,
  '(?m)^\s*<script type="module" src="js/app\.js"></script>\s*$',
  "  <script>`n$bundle`n  </script>"
)

# A file:// build does not need a Service Worker.
$sourceHtml = $sourceHtml.Replace(
  'if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});',
  '/* The self-contained build does not need a Service Worker. */'
)

$outputPath = Join-Path $projectRoot 'hezhang-offline.html'
[IO.File]::WriteAllText($outputPath, $sourceHtml, [Text.UTF8Encoding]::new($false))

$output = Get-Item -LiteralPath $outputPath
Write-Output "Generated: $($output.FullName)"
Write-Output "Size: $($output.Length) bytes"
