@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\wechat-full\run.ps1" -Mode server %*
if errorlevel 1 (
  echo Server stopped with an error. Please read the message above.
  pause
  exit /b 1
)
