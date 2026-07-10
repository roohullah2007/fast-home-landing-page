@echo off
echo Clearing Vite cache and node_modules cache...
echo.

REM Remove Vite cache
if exist "node_modules\.vite" (
    echo Removing Vite cache...
    rmdir /s /q "node_modules\.vite"
    echo Vite cache removed.
) else (
    echo Vite cache not found.
)

REM Clear npm cache
echo Clearing npm cache...
call npm cache clean --force

echo.
echo Cache cleared successfully!
echo.
echo Next steps:
echo 1. Restart your development server with: npm run dev
echo 2. If issues persist, run: npm install
echo 3. Then: npm run dev
echo.
pause