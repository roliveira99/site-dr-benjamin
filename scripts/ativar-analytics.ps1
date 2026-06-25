param(
  [Parameter(Mandatory = $true)]
  [string]$SiteUrl,

  [Parameter(Mandatory = $true)]
  [string]$CloudflareToken,

  [Parameter(Mandatory = $true)]
  [string]$ClarityProjectId,

  [switch]$Push
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $root "js\config.js"

if (-not (Test-Path $configPath)) {
  throw "Arquivo nao encontrado: $configPath"
}

$content = Get-Content $configPath -Raw -Encoding UTF8

$content = $content -replace 'siteUrl:\s*"[^"]*"', ('siteUrl: "' + $SiteUrl.TrimEnd('/') + '"')
$content = $content -replace 'cloudflareToken:\s*"[^"]*"', ('cloudflareToken: "' + $CloudflareToken.Trim() + '"')
$content = $content -replace 'clarityProjectId:\s*"[^"]*"', ('clarityProjectId: "' + $ClarityProjectId.Trim() + '"')

Set-Content -Path $configPath -Value $content -Encoding UTF8 -NoNewline

Write-Host "config.js atualizado com analytics." -ForegroundColor Green

if ($Push) {
  Push-Location $root
  git add js/config.js js/analytics.js index.html js/main.js scripts/ativar-analytics.ps1
  git commit -m "Ativa Cloudflare Web Analytics e Microsoft Clarity"
  git push
  Pop-Location
  Write-Host "Alteracoes enviadas para o GitHub. Aguarde 1-2 min o deploy na Cloudflare." -ForegroundColor Green
}
