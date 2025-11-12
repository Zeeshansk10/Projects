#!/bin/bash

echo "========================================"
echo "   PDF Converter - Quick Start Setup"
echo "========================================"
echo ""

echo "[1/4] Copying environment file..."
if [ ! -f backend/.env ]; then
    cp .env.example backend/.env
    echo "✓ Created backend/.env"
else
    echo "✓ backend/.env already exists"
fi

echo ""
echo "[2/4] Installing dependencies..."
echo "Installing root dependencies..."
npm install
echo ""
echo "Installing backend dependencies..."
cd backend
npm install
cd ..
echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "[3/4] Creating required directories..."
mkdir -p backend/uploads backend/converted backend/data
echo "✓ Directories created"

echo ""
echo "========================================"
echo "   Setup Complete! 🎉"
echo "========================================"
echo ""
echo "IMPORTANT: Make sure LibreOffice is installed!"
echo ""
echo "Install LibreOffice:"
echo "  - macOS: brew install --cask libreoffice"
echo "  - Ubuntu: sudo apt install libreoffice"
echo "  - Fedora: sudo dnf install libreoffice"
echo ""
echo "========================================"
echo "   Next Steps:"
echo "========================================"
echo ""
echo "1. Edit backend/.env and change JWT_SECRET"
echo "2. Make sure LibreOffice is installed"
echo "3. Run: npm run dev"
echo "4. Open: http://localhost:5173"
echo ""
echo "========================================"
