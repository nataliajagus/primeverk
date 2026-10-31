# Generuje src/assets/og-{is,en,pl}.png z tools/og.html (Edge headless)
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
$tpl = ([Uri](Join-Path $PSScriptRoot 'og.html')).AbsoluteUri
foreach ($lang in 'is', 'en', 'pl') {
  $out = Join-Path $PSScriptRoot "..\src\assets\og-$lang.png"
  & $edge --headless --disable-gpu --hide-scrollbars --window-size=1200,630 "--screenshot=$out" "$tpl#$lang" | Out-Null
}
