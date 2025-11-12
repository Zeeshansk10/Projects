# 🎯 Installation Commands - PDF Converter

## Quick Installation (Copy & Paste)

### For Windows (Command Prompt / cmd):

```cmd
REM Step 1: Navigate to project folder
cd /d "c:\Users\HP\Desktop\MY Project\NEW"

REM Step 2: Install LibreOffice
winget install TheDocumentFoundation.LibreOffice

REM Step 3: Copy environment file
copy .env.example backend\.env

REM Step 4: Install all dependencies
npm install
cd backend
npm install
cd ..\frontend
npm install
cd ..

REM Step 5: Create required directories
mkdir backend\uploads
mkdir backend\converted  
mkdir backend\data

REM Step 6: Run the application
npm run dev
```

### For Windows (PowerShell):

```powershell
# Step 1: Navigate to project folder
cd "c:\Users\HP\Desktop\MY Project\NEW"

# Step 2: Install LibreOffice
winget install TheDocumentFoundation.LibreOffice

# Step 3: Copy environment file
Copy-Item .env.example backend\.env

# Step 4: Install all dependencies
npm install
cd backend
npm install
cd ..\frontend
npm install
cd ..

# Step 5: Create required directories
New-Item -Path "backend\uploads" -ItemType Directory -Force
New-Item -Path "backend\converted" -ItemType Directory -Force
New-Item -Path "backend\data" -ItemType Directory -Force

# Step 6: Run the application
npm run dev
```

### For macOS / Linux:

```bash
# Step 1: Navigate to project folder
cd "/Users/HP/Desktop/MY Project/NEW"

# Step 2: Install LibreOffice
# macOS:
brew install --cask libreoffice

# Ubuntu/Debian:
# sudo apt update && sudo apt install libreoffice

# Fedora:
# sudo dnf install libreoffice

# Step 3: Copy environment file
cp .env.example backend/.env

# Step 4: Install all dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# Step 5: Create required directories
mkdir -p backend/uploads backend/converted backend/data

# Step 6: Run the application
npm run dev
```

---

## Automated Setup

### Windows:
```cmd
setup.bat
```

### macOS / Linux:
```bash
chmod +x setup.sh
./setup.sh
```

---

## Individual Package Installation

If you need to install packages separately:

### Root Packages:
```cmd
npm install concurrently@^8.2.2
```

### Backend Packages:
```cmd
cd backend
npm install express@^4.18.2 multer@^1.4.5-lts.1 bcrypt@^5.1.1 jsonwebtoken@^9.0.2 cors@^2.8.5 express-rate-limit@^7.1.5 dotenv@^16.3.1 libreoffice-convert@^1.6.0 pdf-lib@^1.17.1 node-cron@^3.0.3
npm install --save-dev nodemon@^3.0.2
```

### Frontend Packages:
```cmd
cd frontend
npm install react@^18.2.0 react-dom@^18.2.0 react-router-dom@^6.20.1 axios@^1.6.2
npm install --save-dev @vitejs/plugin-react@^4.2.1 vite@^5.0.8
```

---

## Post-Installation

### 1. Edit Backend Environment File

Open `backend\.env` and change the JWT_SECRET:

```env
JWT_SECRET=your_unique_secret_key_here_change_this_to_something_random
```

### 2. Verify LibreOffice Installation

```cmd
soffice --version
```

Should output something like: `LibreOffice 7.6.x.x`

If not found, add to PATH:
- Windows: `C:\Program Files\LibreOffice\program`
- macOS: `/Applications/LibreOffice.app/Contents/MacOS`
- Linux: Usually auto-configured

### 3. Start the Application

```cmd
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

## Run Commands

### Development (Both servers):
```cmd
npm run dev
```

### Backend Only:
```cmd
npm run dev:backend
```

### Frontend Only:
```cmd
npm run dev:frontend
```

### Production Build:
```cmd
# Build frontend
npm run build

# Start production server
npm start
```

---

## Verify Installation

Check that everything is installed correctly:

```cmd
# Check Node.js
node --version

# Check npm
npm --version

# Check LibreOffice
soffice --version

# Check if backend dependencies installed
cd backend
npm list

# Check if frontend dependencies installed
cd ..\frontend
npm list
```

---

## Troubleshooting Installation

### Issue: npm command not found
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Cannot find module errors
**Solution:** Run `npm install` in the respective directory

### Issue: LibreOffice not found
**Solution:** Install LibreOffice and add to PATH (see above)

### Issue: Permission denied
**Solution (Windows):** Run terminal as Administrator
**Solution (Mac/Linux):** Use `sudo` for global installs only

### Issue: Port already in use
**Solution:** Change PORT in `backend\.env`

---

## Clean Reinstall

If you need to start fresh:

```cmd
# Delete all node_modules
rmdir /s /q node_modules
rmdir /s /q backend\node_modules
rmdir /s /q frontend\node_modules

# Delete lock files
del package-lock.json
del backend\package-lock.json
del frontend\package-lock.json

# Reinstall everything
npm install
cd backend && npm install
cd ..\frontend && npm install
cd ..
```

---

## System Requirements

- **Node.js:** v16.0.0 or higher
- **npm:** v7.0.0 or higher
- **LibreOffice:** 7.0 or higher
- **OS:** Windows 10/11, macOS 10.15+, Ubuntu 20.04+
- **RAM:** 2GB minimum, 4GB recommended
- **Disk Space:** 500MB minimum for dependencies

---

## Next Steps After Installation

1. ✅ Verify all installations successful
2. ✅ Edit `backend\.env` JWT_SECRET
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:5173
5. ✅ Register a new account
6. ✅ Test file upload and conversion

---

## Additional Resources

- **Full Documentation:** See `README.md`
- **Quick Start Guide:** See `QUICKSTART.md`
- **Troubleshooting:** See `TROUBLESHOOTING.md`
- **Project Summary:** See `PROJECT_SUMMARY.md`

---

**Ready to start! Run `npm run dev` and enjoy!** 🚀
