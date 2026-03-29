@echo off
title Sourav Portfolio - Starting...
color 0A

echo.
echo  ==========================================
echo   SOURAV PORTFOLIO - STARTING WEBSITE
echo  ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found! Please install Node.js first.
    echo  Download from: https://nodejs.org
    pause
    exit /b 1
)

:: Install server dependencies if needed
if not exist "server\node_modules" (
    echo  [INFO] Installing server dependencies...
    cd server
    npm install
    cd ..
    echo  [OK] Server dependencies installed.
)

:: Install client dependencies if needed
if not exist "client\node_modules" (
    echo  [INFO] Installing client dependencies...
    cd client
    npm install
    cd ..
    echo  [OK] Client dependencies installed.
)

echo.
echo  [1/2] Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd /d %~dp0server && node index.js"

:: Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

echo  [2/2] Starting Frontend on port 5173...
start "Frontend Dev Server" cmd /k "cd /d %~dp0client && npm run dev"

:: Wait 3 seconds for frontend to start
timeout /t 3 /nobreak >nul

echo.
echo  ==========================================
echo   WEBSITE IS RUNNING!
echo  ==========================================
echo.
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:5000
echo   Admin    : http://localhost:5173/admin/login
echo.
echo   Press any key to open in browser...
pause >nul

start http://localhost:5173

echo.
echo   Close the two terminal windows to stop the servers.
echo.
pause
