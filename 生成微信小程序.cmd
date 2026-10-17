@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\wechat-full\run.ps1" -Mode build
if errorlevel 1 (
  echo Build failed. Please read the message above.
  pause
  exit /b 1
)
pause
