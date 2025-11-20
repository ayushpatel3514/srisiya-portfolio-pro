@echo off
setlocal
REM Go to this script's folder (handles spaces)
cd /d "%~dp0"

REM Find npm (works even if PowerShell blocks scripts)
where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
  set "NPM_CMD=%ProgramFiles%\nodejs\npm.cmd"
) else (
  for /f "delims=" %%i in ('where npm') do set "NPM_CMD=%%i"
)

if not exist "%NPM_CMD%" (
  echo.
  echo ❌ npm was not found. Please install Node.js from https://nodejs.org and try again.
  echo.
  pause
  exit /b 1
)

REM Install dependencies if missing
if not exist node_modules (
  echo 📦 Installing dependencies...
  call "%NPM_CMD%" install
)

echo 🚀 Starting dev server...
start "Vite Dev Server" cmd /k "%NPM_CMD%" run dev

REM Give the server a head start, then open the browser
timeout /t 3 >nul
start "" "http://localhost:5173/"

endlocal
