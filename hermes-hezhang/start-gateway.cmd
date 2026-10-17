@echo off
cd /d "%~dp0"
if not exist hezhang-gateway.json copy hezhang-gateway.example.json hezhang-gateway.json >nul
python hezhang_gateway_qq.py
pause
