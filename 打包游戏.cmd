@echo off
chcp 65001 >nul
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\build-apps.ps1" %*
if errorlevel 1 (
  echo.
  echo Build failed. Please read the message above.
  pause
  exit /b 1
)
echo.
echo Build complete. Files are in dist\apps.
pause
