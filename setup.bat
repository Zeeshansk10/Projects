@echo off
echo ========================================
echo    PDF Converter - Quick Start Setup
echo ========================================
echo.

echo [1/4] Copying environment file...
if not exist backend\.env (
    copy .env.example backend\.env
    echo ✓ Created backend\.env
) else (
    echo ✓ backend\.env already exists
)

echo.
echo [2/4] Installing dependencies...
echo Installing root dependencies...
call npm install
echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..
echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo [3/4] Creating required directories...
if not exist backend\uploads mkdir backend\uploads
if not exist backend\converted mkdir backend\converted
if not exist backend\data mkdir backend\data
echo ✓ Directories created

echo.
echo ========================================
echo    Setup Complete! 🎉
echo ========================================
echo.
echo IMPORTANT: Make sure LibreOffice is installed!
echo.
echo Install LibreOffice:
echo   - Windows: winget install TheDocumentFoundation.LibreOffice
echo   - Or download from: https://www.libreoffice.org/download/
echo.
echo After installing LibreOffice, add to PATH:
echo   C:\Program Files\LibreOffice\program
echo.
echo ========================================
echo    Next Steps:
echo ========================================
echo.
echo 1. Edit backend\.env and change JWT_SECRET
echo 2. Make sure LibreOffice is installed
echo 3. Run: npm run dev
echo 4. Open: http://localhost:5173
echo.
echo ========================================
pause
