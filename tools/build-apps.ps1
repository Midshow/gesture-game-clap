[CmdletBinding()]
param(
    [string]$Html,
    [ValidateSet('all','windows','android')][string]$Target = 'all',
    [string]$Version,
    [int]$VersionCode = 0
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$repo = Split-Path $PSScriptRoot -Parent
$templates = Join-Path $PSScriptRoot 'native-pack'
$cache = Join-Path $repo '.cache/native-pack'
New-Item -ItemType Directory -Force $cache | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Write-Utf8([string]$Path, [string]$Text) {
    [IO.File]::WriteAllText($Path, $Text, (New-Object Text.UTF8Encoding($false)))
}
function Run([string]$Exe, [string[]]$Arguments) {
    & $Exe @Arguments
    if ($LASTEXITCODE -ne 0) { throw "$Exe failed (exit $LASTEXITCODE)." }
}
function Run-AndroidNative([string]$Exe, [string[]]$Arguments) {
    # aapt2 on Windows cannot reliably open absolute paths containing Chinese characters.
    # All its inputs/outputs live in this repository; relative ASCII paths avoid that limitation.
    $prefix = $repo.TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar
    $relative = @($Arguments | ForEach-Object { if ($_.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { $_.Substring($prefix.Length) } else { $_ } })
    Push-Location -LiteralPath $repo
    try { Run $Exe $relative } finally { Pop-Location }
}
function Get-Archive([string]$Name, [string]$Url, [string]$Hash, [string]$Algorithm = 'SHA256') {
    $zip = Join-Path $cache "$Name.zip"
    $folder = Join-Path $cache $Name
    if (!(Test-Path -LiteralPath $zip) -or (Get-FileHash -LiteralPath $zip -Algorithm $Algorithm).Hash -ne $Hash) {
        Write-Host "Downloading $Name (first build only)..."
        $partial = "$zip.partial"
        Invoke-WebRequest -UseBasicParsing $Url -OutFile $partial
        if ((Get-FileHash -LiteralPath $partial -Algorithm $Algorithm).Hash -ne $Hash) { throw "Checksum mismatch: $Name" }
        Move-Item -LiteralPath $partial -Destination $zip -Force
    }
    if (!(Test-Path -LiteralPath (Join-Path $folder '.ready'))) {
        Expand-Archive -LiteralPath $zip -DestinationPath $folder -Force
        Write-Utf8 (Join-Path $folder '.ready') $Hash
    }
    return $folder
}

if (!$Html) {
    # Numeric ordering: v2.5.10 is newer than v2.5.9. Only the formal single-file archive is searched.
    $latest = Get-ChildItem -LiteralPath (Join-Path $repo '合掌网页版-正式版本存档') -Filter '*.html' |
        Where-Object { $_.BaseName -match '^合掌网页版v\d+(\.\d+){1,3}$' } |
        Sort-Object { [version]($_.BaseName -replace '^合掌网页版v','') } -Descending | Select-Object -First 1
    if (!$latest) { throw 'No versioned game HTML found. Pass -Html explicitly.' }
    $Html = $latest.FullName
}
$source = (Resolve-Path -LiteralPath $Html).Path
if ([IO.Path]::GetExtension($source) -ne '.html') { throw '-Html must refer to a single HTML file.' }
if (!$Version) {
    if ([IO.Path]::GetFileNameWithoutExtension($source) -match 'v(\d+(?:\.\d+){1,3})$') { $Version = $Matches[1] }
    else { throw 'Cannot infer version from file name. Pass -Version 2.5.8.2.' }
}
if ($Version -notmatch '^\d+(\.\d+){1,3}$') { throw 'Version must contain 2 to 4 numeric components.' }
$parts = @($Version.Split('.') | ForEach-Object { [int]$_ })
if (@($parts | Where-Object { $_ -gt 99 }).Count) { throw 'Each version component must be 0..99.' }
while ($parts.Count -lt 4) { $parts += 0 }
if ($VersionCode -eq 0) { $VersionCode = $parts[0]*1000000 + $parts[1]*10000 + $parts[2]*100 + $parts[3] }
if ($VersionCode -lt 1) { throw 'VersionCode must be positive.' }
$sourceHash = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
$text = [IO.File]::ReadAllText($source)
if ($text -notmatch '(?is)<html\b' -or $text -notmatch '(?is)<script\b') { throw 'Expected a complete HTML game.' }
$resourceRefs = [regex]::Matches($text, '(?is)<(?:script|img|link|audio|video|source)\b[^>]*?\b(?:src|href)\s*=\s*["'']([^"'']+)["'']')
foreach ($ref in $resourceRefs) {
    if ($ref.Groups[1].Value -notmatch '^(data:|blob:|#)') { throw "This packer expects self-contained HTML; external asset: $($ref.Groups[1].Value)" }
}
$out = Join-Path $repo "dist/apps/$Version"
$work = Join-Path $cache ('work-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $out,$work | Out-Null
$artifacts = @()
Write-Host "Source: $source"
Write-Host "Version: $Version / Android versionCode: $VersionCode"

if ($Target -in @('all','windows')) {
    $sdk = Get-Archive 'webview2-1.0.4258.31' 'https://api.nuget.org/v3-flatcontainer/microsoft.web.webview2/1.0.4258.31/microsoft.web.webview2.1.0.4258.31.nupkg' '56F7F4B8BF9AEE4B8EFEFBBDD4F67D5F74EBD1B100ED0806DA71BF76AF481AA9'
    $csc = Join-Path $env:WINDIR 'Microsoft.NET/Framework64/v4.0.30319/csc.exe'
    if (!(Test-Path -LiteralPath $csc)) { throw 'Windows .NET Framework 4.x compiler is missing.' }
    $core = Join-Path $sdk 'lib/net462/Microsoft.Web.WebView2.Core.dll'
    $forms = Join-Path $sdk 'lib/net462/Microsoft.Web.WebView2.WinForms.dll'
    $loader = Join-Path $sdk 'runtimes/win-x64/native/WebView2Loader.dll'
    $buildInfo = Join-Path $work 'BuildInfo.cs'
    Write-Utf8 $buildInfo @"
using System.Reflection;
[assembly: AssemblyTitle("合掌")]
[assembly: AssemblyProduct("合掌")]
[assembly: AssemblyVersion("$($parts -join '.')")]
internal static class BuildInfo {
    internal const string Version = "$Version";
    internal const string ContentHash = "$sourceHash-webview2-1.0.4258.31";
}
"@
    $exe = Join-Path $out "Hezhang-$Version-windows-x64.exe"
    Write-Host 'Compiling Windows EXE...'
    $embeddedHtml = Join-Path $work 'index.html'
    Copy-Item -LiteralPath $source -Destination $embeddedHtml
    Run $csc @('/nologo','/target:winexe','/platform:x64','/optimize+',"/win32manifest:$(Join-Path $templates 'windows/app.manifest')", "/out:$exe",'/reference:System.Windows.Forms.dll','/reference:System.Drawing.dll',"/reference:$core", "/reference:$forms", "/resource:$core,Microsoft.Web.WebView2.Core.dll", "/resource:$forms,Microsoft.Web.WebView2.WinForms.dll", "/resource:$loader,WebView2Loader.dll", "/resource:$embeddedHtml,index.html", (Join-Path $templates 'windows/Program.cs'), $buildInfo)
    $artifacts += $exe
}

if ($Target -in @('all','android')) {
    $jdkCandidates = @()
    if ($env:JAVA_HOME) { $jdkCandidates += Join-Path $env:JAVA_HOME 'bin' }
    $javacCommand = Get-Command javac -ErrorAction SilentlyContinue
    if ($javacCommand) { $jdkCandidates += Split-Path $javacCommand.Source -Parent }
    $javaRoot = Join-Path $env:ProgramFiles 'Java'
    if (Test-Path -LiteralPath $javaRoot) { $jdkCandidates += Get-ChildItem -LiteralPath $javaRoot -Directory | Sort-Object Name -Descending | ForEach-Object { Join-Path $_.FullName 'bin' } }
    $jdk = $jdkCandidates | Where-Object { (Test-Path -LiteralPath (Join-Path $_ 'javac.exe')) -and (Test-Path -LiteralPath (Join-Path $_ 'jar.exe')) -and (Test-Path -LiteralPath (Join-Path $_ 'keytool.exe')) } | Select-Object -First 1
    if (!$jdk) { throw 'JDK tools not found. Install JDK 17 or newer and set JAVA_HOME to the JDK folder.' }
    $java = Join-Path $jdk 'java.exe'
    $bt = Get-Archive 'android-build-tools-35.0.0' 'https://dl.google.com/android/repository/build-tools_r35_windows.zip' 'af059bb67cf7786f45ee0db85e2d24985df1b4b6' 'SHA1'
    $platform = Get-Archive 'android-platform-35-r02' 'https://dl.google.com/android/repository/platform-35_r02.zip' '0bb560a90a7a2cbd0dd8348224d518b638fe7949' 'SHA1'
    $aapt = (Get-ChildItem -LiteralPath $bt -Recurse -Filter 'aapt2.exe' | Select-Object -First 1).FullName
    $align = (Get-ChildItem -LiteralPath $bt -Recurse -Filter 'zipalign.exe' | Select-Object -First 1).FullName
    $d8 = (Get-ChildItem -LiteralPath $bt -Recurse -Filter 'd8.jar' | Select-Object -First 1).FullName
    $signer = (Get-ChildItem -LiteralPath $bt -Recurse -Filter 'apksigner.jar' | Select-Object -First 1).FullName
    $androidJar = (Get-ChildItem -LiteralPath $platform -Recurse -Filter 'android.jar' | Select-Object -First 1).FullName
    $androidWork = Join-Path $work 'android'
    $classes = Join-Path $androidWork 'classes'
    $dex = Join-Path $androidWork 'dex'
    $assets = Join-Path $androidWork 'assets'
    New-Item -ItemType Directory -Force $classes,$dex,$assets | Out-Null
    Copy-Item -LiteralPath $source -Destination (Join-Path $assets 'index.html')
    Write-Host 'Compiling Android APK...'
    Run (Join-Path $jdk 'javac.exe') @('-J-Duser.language=en','--release','8','-Xlint:-options','-encoding','UTF-8','-classpath',$androidJar,'-d',$classes,(Join-Path $templates 'android/MainActivity.java'))
    $classesJar = Join-Path $androidWork 'classes.jar'
    Run (Join-Path $jdk 'jar.exe') @('cf',$classesJar,'-C',$classes,'.')
    Run $java @('-cp',$d8,'com.android.tools.r8.D8','--release','--min-api','26','--lib',$androidJar,'--output',$dex,$classesJar)
    $resources = Join-Path $androidWork 'resources.zip'
    Run-AndroidNative $aapt @('compile','--dir',(Join-Path $templates 'android/res'),'-o',$resources)
    $unsigned = Join-Path $androidWork 'unsigned.apk'
    Run-AndroidNative $aapt @('link','-o',$unsigned,'-I',$androidJar,'--manifest',(Join-Path $templates 'android/AndroidManifest.xml'),'-A',$assets,'--version-code',"$VersionCode",'--version-name',$Version,'-R',$resources)
    $zip = [IO.Compression.ZipFile]::Open($unsigned, [IO.Compression.ZipArchiveMode]::Update)
    try { [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,(Join-Path $dex 'classes.dex'),'classes.dex') | Out-Null } finally { $zip.Dispose() }
    $aligned = Join-Path $androidWork 'aligned.apk'
    Run-AndroidNative $align @('-f','4',$unsigned,$aligned)

    # Persistent private signing identity: losing this prevents in-place Android updates.
    $secrets = Join-Path $repo 'local-archive/packaging-signing'
    $keystore = Join-Path $secrets 'hezhang.p12'
    $passfile = Join-Path $secrets 'password.txt'
    New-Item -ItemType Directory -Force $secrets | Out-Null
    if ((Test-Path -LiteralPath $keystore) -xor (Test-Path -LiteralPath $passfile)) { throw 'Incomplete signing identity. Restore BOTH hezhang.p12 and password.txt from backup; do not regenerate.' }
    if (!(Test-Path -LiteralPath $keystore)) {
        $random = New-Object byte[] 32
        $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
        try { $rng.GetBytes($random) } finally { $rng.Dispose() }
        Write-Utf8 $passfile ([Convert]::ToBase64String($random))
        Run (Join-Path $jdk 'keytool.exe') @('-genkeypair','-keystore',$keystore,'-storetype','PKCS12','-alias','hezhang','-keyalg','RSA','-keysize','3072','-validity','10000','-dname','CN=Hezhang Local Distribution','-storepass:file',$passfile,'-keypass:file',$passfile)
    }
    $apk = Join-Path $out "Hezhang-$Version-android.apk"
    Run $java @('-jar',$signer,'sign','--ks',$keystore,'--ks-key-alias','hezhang','--ks-pass',"file:$passfile",'--v4-signing-enabled','false','--out',$apk,$aligned)
    Run $java @('-jar',$signer,'verify','--verbose','--print-certs',$apk)
    Run-AndroidNative $align @('-c','4',$apk)
    $artifacts += $apk
}

foreach ($artifact in $artifacts) {
    $archive = $null
    if ([IO.Path]::GetExtension($artifact) -eq '.apk') {
        $archive = [IO.Compression.ZipFile]::OpenRead($artifact)
        $payload = $archive.GetEntry('assets/index.html').Open()
    } else {
        $payload = [Reflection.Assembly]::LoadFile($artifact).GetManifestResourceStream('index.html')
    }
    $sha = [Security.Cryptography.SHA256]::Create()
    try { $embeddedHash = [BitConverter]::ToString($sha.ComputeHash($payload)).Replace('-','') }
    finally { $sha.Dispose(); $payload.Dispose(); if ($archive) { $archive.Dispose() } }
    if ($embeddedHash -ne $sourceHash) { throw "Embedded HTML differs from source: $artifact" }
}

$manifest = [ordered]@{
    source = [IO.Path]::GetFileName($source); sourceSHA256 = $sourceHash
    version = $Version; androidVersionCode = $VersionCode
    builtAt = [DateTimeOffset]::Now.ToString('o')
    artifacts = @($artifacts | ForEach-Object { [ordered]@{ file = [IO.Path]::GetFileName($_); bytes = (Get-Item -LiteralPath $_).Length; sha256 = (Get-FileHash -LiteralPath $_ -Algorithm SHA256).Hash } })
}
Write-Utf8 (Join-Path $out "build-$Target.json") ($manifest | ConvertTo-Json -Depth 5)
Write-Host "Done. Output: $out"
$artifacts | ForEach-Object { Write-Host ("{0}  ({1:N2} MB)" -f $_,((Get-Item -LiteralPath $_).Length/1MB)) }
