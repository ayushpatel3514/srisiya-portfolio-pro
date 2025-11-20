$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here

# Temporarily allow scripts this session only
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# Resolve npm (use npm.cmd if npm not in PATH)
if (Get-Command npm -ErrorAction SilentlyContinue) {
  $npm = "npm"
} else {
  $npm = Join-Path $env:ProgramFiles "nodejs\npm.cmd"
}

if (-not (Test-Path $npm) -and $npm -eq "npm") {
  Write-Host "❌ npm not found. Install Node.js from https://nodejs.org" -ForegroundColor Red
  pause
  exit
}

if (-not (Test-Path "node_modules")) {
  Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
  & $npm install
}

Write-Host "🚀 Starting dev server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit","-Command","& `"$npm`" run dev"
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173/"
