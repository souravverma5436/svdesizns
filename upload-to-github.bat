@echo off
title SV Desizns — Upload to GitHub
color 0A

echo.
echo ╔══════════════════════════════════════════════╗
echo ║     SV DESIZNS — UPLOAD TO GITHUB           ║
echo ╚══════════════════════════════════════════════╝
echo.

cd /d "D:\WEB\sourav-portfolio"

echo [1/4] Checking git status...
git status
echo.

echo [2/4] Adding all changed files...
git add .
git add -f "client/public/images/" 2>nul
echo     Done.
echo.

echo [3/4] Enter your commit message:
set /p MSG="    Message: "
echo.
git commit -m "%MSG%"
echo.

echo [4/4] Pushing to GitHub (main branch)...
git push origin main
echo.

if %ERRORLEVEL% == 0 (
    echo ╔══════════════════════════════════════════════╗
    echo ║   SUCCESS! Code uploaded to GitHub.          ║
    echo ║   Vercel will auto-deploy in ~1 minute.      ║
    echo ╚══════════════════════════════════════════════╝
) else (
    echo ╔══════════════════════════════════════════════╗
    echo ║   ERROR! Push failed. Trying pull + push...  ║
    echo ╚══════════════════════════════════════════════╝
    echo.
    git pull --rebase origin main
    git push origin main
    echo.
    echo Done. Check above for any errors.
)

echo.
echo Live site: https://svdesizns.vercel.app
echo GitHub   : https://github.com/souravverma5436/svdesizns
echo.
pause
