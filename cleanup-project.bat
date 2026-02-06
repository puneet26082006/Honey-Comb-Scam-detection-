@echo off
echo 🧹 Cleaning up project for deployment...
echo.

echo Removing test files...
del /f /q test-*.* 2>nul
del /f /q SYSTEM_*.md 2>nul
del /f /q FIXES_*.md 2>nul
del /f /q OLLAMA_*.md 2>nul
del /f /q ENHANCED_*.md 2>nul

echo Removing development files...
del /f /q setup-*.bat 2>nul
del /f /q rebuild-*.bat 2>nul

echo Keeping essential files:
echo ✅ src/ folder
echo ✅ public/ folder  
echo ✅ ramesh_bot/ folder
echo ✅ package.json
echo ✅ README.md
echo ✅ .env

echo.
echo 🎯 Project cleaned for deployment!
pause