@echo off
echo ========================================
echo MongoDB DNS Fix - Run as Administrator
echo ========================================
echo.
echo This will change your DNS to Google DNS (8.8.8.8)
echo to fix MongoDB connection issues.
echo.
echo Right-click this file and select "Run as Administrator"
echo.
pause

powershell -ExecutionPolicy Bypass -File "%~dp0fix-dns.ps1"
