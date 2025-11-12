# 🔧 Troubleshooting Guide - PDF Converter

Common issues and solutions for the PDF Converter application.

---

## 🚨 Installation Issues

### Issue: "npm command not found" or "npm is not recognized"

**Cause:** Node.js is not installed or not in PATH

**Solution:**
1. Download and install Node.js from https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Restart your terminal/command prompt
4. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

---

### Issue: "Cannot load scripts - execution policies"

**Cause:** PowerShell script execution is disabled (Windows)

**Solution:**
Use Command Prompt (cmd) instead of PowerShell, or:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then restart your terminal.

---

### Issue: Dependencies fail to install

**Symptoms:** Errors during `npm install`

**Solutions:**

1. **Clear npm cache:**
   ```cmd
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall:**
   ```cmd
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

3. **Use legacy peer deps (if peer dependency errors):**
   ```cmd
   npm install --legacy-peer-deps
   ```

4. **Update npm:**
   ```cmd
   npm install -g npm@latest
   ```

---

## 🔒 LibreOffice Issues

### Issue: "LibreOffice not found" or "LibreOffice conversion failed"

**Cause:** LibreOffice is not installed or not in system PATH

**Solution (Windows):**

1. **Install LibreOffice:**
   ```cmd
   winget install TheDocumentFoundation.LibreOffice
   ```
   Or download from: https://www.libreoffice.org/download/

2. **Add to PATH:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" → "Environment Variables"
   - Under "System Variables", find "Path" → Click "Edit"
   - Click "New" and add: `C:\Program Files\LibreOffice\program`
   - Click OK on all dialogs

3. **Verify installation:**
   ```cmd
   soffice --version
   ```
   Should output: `LibreOffice X.X.X.X`

4. **Restart everything:**
   - Close all terminals
   - Close VS Code
   - Reopen and try again

**Solution (Mac):**
```bash
brew install --cask libreoffice
```

**Solution (Linux):**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install libreoffice

# Fedora
sudo dnf install libreoffice
```

---

### Issue: LibreOffice installed but still not working

**Cause:** PATH not updated or wrong installation path

**Solutions:**

1. **Find LibreOffice installation:**
   ```cmd
   where soffice
   ```
   Or manually check:
   - `C:\Program Files\LibreOffice\program`
   - `C:\Program Files (x86)\LibreOffice\program`

2. **Add the correct path to environment variables**

3. **Restart computer** (sometimes required for PATH changes)

---

## 🌐 Server Issues

### Issue: "Port 5000 is already in use"

**Cause:** Another application is using port 5000

**Solutions:**

**Option 1 - Change port:**
1. Edit `backend\.env`
2. Change PORT:
   ```env
   PORT=5001
   ```
3. Restart the server

**Option 2 - Kill the process using the port:**

Windows:
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

Mac/Linux:
```bash
lsof -ti:5000 | xargs kill -9
```

---

### Issue: "CORS error" or "Access-Control-Allow-Origin"

**Cause:** Frontend and backend URLs don't match

**Solution:**

1. Check `backend\.env` has correct frontend URL:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

2. If you changed frontend port, update `FRONTEND_URL`

3. Restart backend server

---

### Issue: Server starts but immediately crashes

**Check for:**

1. **Missing .env file:**
   ```cmd
   copy .env.example backend\.env
   ```

2. **Missing directories:**
   ```cmd
   mkdir backend\uploads
   mkdir backend\converted
   mkdir backend\data
   ```

3. **Check terminal for error messages**

---

## 🔐 Authentication Issues

### Issue: "Token is not valid" or "No authentication token"

**Causes & Solutions:**

1. **Token expired (7 days):**
   - Logout and login again

2. **localStorage cleared:**
   - Login again

3. **JWT_SECRET changed:**
   - All users need to login again

4. **Token malformed:**
   - Clear browser storage:
     ```javascript
     // In browser console (F12)
     localStorage.clear()
     ```
   - Refresh page and login again

---

### Issue: "Invalid credentials" when logging in

**Causes:**

1. **Wrong email/password** - Double-check credentials
2. **User doesn't exist** - Register first
3. **Case sensitivity** - Email is case-insensitive, but check for typos

**Solution:**
- Create a new account if you forgot credentials
- Or manually edit `backend/data/users.json` (development only)

---

### Issue: Can't register - "User already exists"

**Cause:** Email already registered

**Solutions:**

1. **Login with existing account**

2. **Use different email**

3. **Delete user from database (dev only):**
   - Edit `backend/data/users.json`
   - Remove the user object
   - Restart backend

---

## 📁 File Upload Issues

### Issue: "File type not supported"

**Supported formats:**
- Images: .jpg, .jpeg, .png, .gif, .bmp
- Documents: .docx, .doc, .txt
- Spreadsheets: .xlsx, .xls
- Presentations: .pptx, .ppt
- PDF: .pdf

**Solutions:**

1. **Check file extension** matches supported types

2. **Convert file to supported format first:**
   - Use image editor to save as JPG/PNG
   - Use Office to save as DOCX/XLSX/PPTX

---

### Issue: "File too large" or upload fails

**Cause:** File exceeds 20MB limit

**Solutions:**

1. **Compress the file:**
   - Images: Use image compressor
   - Documents: Remove images/reduce quality

2. **Increase limit (in `backend\.env`):**
   ```env
   MAX_FILE_SIZE=50
   ```
   Change to desired MB size

---

### Issue: Upload succeeds but conversion fails

**Common causes:**

1. **LibreOffice not installed/configured** (see above)

2. **Corrupted file:**
   - Try a different file
   - Re-download the original

3. **Unsupported file variant:**
   - Some old Office formats may fail
   - Convert to newer format (.docx instead of .doc)

4. **Permissions issue:**
   - Check `uploads` and `converted` folders exist
   - Check write permissions

---

### Issue: "Too many file uploads" error

**Cause:** Rate limit exceeded (10 uploads per 15 minutes)

**Solutions:**

1. **Wait 15 minutes** for rate limit to reset

2. **Increase rate limit (in `backend/routes/files.js`):**
   ```javascript
   const uploadLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 20, // Increase this
     // ...
   });
   ```

---

## 💾 Download Issues

### Issue: PDF downloads but won't open

**Causes & Solutions:**

1. **Download incomplete:**
   - Check file size (should be > 0 KB)
   - Try downloading again

2. **Conversion failed:**
   - Check backend terminal for errors
   - Try uploading again

3. **Browser blocked download:**
   - Check browser downloads
   - Allow downloads from localhost

---

### Issue: Can't find downloaded files

**Solution:**

Check your browser's download folder:
- Chrome: `chrome://downloads/`
- Firefox: `about:downloads`
- Edge: `edge://downloads/`

Or manually check:
- Windows: `C:\Users\YourName\Downloads`
- Mac: `~/Downloads`
- Linux: `~/Downloads`

---

## 🎨 Frontend Issues

### Issue: Frontend won't start

**Check:**

1. **Node modules installed:**
   ```cmd
   cd frontend
   npm install
   ```

2. **Port 5173 available:**
   - Change in `vite.config.js` if needed

3. **Dependencies up to date:**
   ```cmd
   npm update
   ```

---

### Issue: White screen or React errors

**Solutions:**

1. **Clear browser cache:**
   - Ctrl+Shift+R (hard refresh)
   - Or clear cache in browser settings

2. **Check browser console** (F12) for errors

3. **Rebuild:**
   ```cmd
   cd frontend
   rmdir /s node_modules
   npm install
   npm run dev
   ```

---

### Issue: "Module not found" errors

**Cause:** Missing dependencies

**Solution:**
```cmd
cd frontend
npm install
```

If specific package is missing:
```cmd
npm install <package-name>
```

---

## 🌍 Network Issues

### Issue: Backend API calls fail

**Check:**

1. **Backend server running:**
   - Should see "Server running on port 5000" in terminal

2. **Correct backend URL:**
   - Frontend uses proxy to `/api`
   - Backend runs on `localhost:5000`

3. **Network tab in browser** (F12):
   - Check API requests
   - Look for 404, 500 errors
   - Check request/response

---

### Issue: "Failed to fetch" or "Network Error"

**Solutions:**

1. **Check backend is running:**
   ```cmd
   npm run dev:backend
   ```

2. **Check firewall:**
   - Allow Node.js through firewall

3. **Try different port:**
   - Change PORT in `backend\.env`

4. **Disable VPN/Proxy** temporarily

---

## 🗄️ Data Issues

### Issue: Files/users disappeared

**Causes:**

1. **Automatic cleanup ran:**
   - Files older than 30 minutes are deleted
   - This is normal behavior

2. **users.json was reset:**
   - If empty `[]`, all users deleted
   - Need to re-register

**Prevention:**

- Increase retention time in `.env`:
  ```env
  FILE_RETENTION_MINUTES=120
  ```

---

### Issue: Can't delete files

**Solutions:**

1. **Check file ownership:**
   - You can only delete your own files

2. **File already deleted:**
   - Refresh the page

3. **Backend error:**
   - Check terminal for errors

---

## 🖥️ Windows-Specific Issues

### Issue: Long file paths error

**Solution:**

Enable long paths in Windows:
```powershell
# Run as Administrator
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

Or move project to shorter path like `C:\dev\pdf-converter`

---

### Issue: Permission denied errors

**Solution:**

1. **Run terminal as Administrator**

2. **Check antivirus:**
   - Temporarily disable to test
   - Add project folder to exclusions

3. **Check folder permissions:**
   - Right-click folder → Properties → Security
   - Ensure your user has full control

---

## 🍎 Mac-Specific Issues

### Issue: Permission denied when installing

**Solution:**

Don't use `sudo` with npm. Instead:
```bash
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

Add to `~/.bash_profile` or `~/.zshrc`

---

## 🐧 Linux-Specific Issues

### Issue: EACCES permission errors

**Solution:**

```bash
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER .
```

---

## 🧪 Testing Issues

### Issue: Can't test file conversion

**Solution:**

Use provided test file:
```cmd
# Upload this file:
test-files\sample.txt
```

Or create simple test files:
- Image: Take a screenshot → save as .png
- Text: Create in Notepad → save as .txt
- Document: Create in Word → save as .docx

---

## 🔍 Debugging Tips

### Enable detailed logging:

1. **Backend - Add to server.js:**
   ```javascript
   app.use((req, res, next) => {
     console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
     console.log('Headers:', req.headers);
     console.log('Body:', req.body);
     next();
   });
   ```

2. **Frontend - Add to components:**
   ```javascript
   console.log('State:', state);
   console.log('Props:', props);
   ```

3. **Check Network tab in browser (F12)**

4. **Check terminal output for both frontend and backend**

---

## 🆘 Still Having Issues?

If none of the above helps:

1. **Check all prerequisites:**
   - ✅ Node.js installed
   - ✅ LibreOffice installed and in PATH
   - ✅ All dependencies installed
   - ✅ .env file configured

2. **Fresh start:**
   ```cmd
   # Delete everything and reinstall
   rmdir /s node_modules
   rmdir /s backend\node_modules
   rmdir /s frontend\node_modules
   del package-lock.json
   del backend\package-lock.json
   del frontend\package-lock.json
   npm run install:all
   ```

3. **Check system requirements:**
   - Windows 10/11, macOS 10.15+, or modern Linux
   - Node.js v16 or higher
   - 2GB+ RAM available
   - 500MB+ disk space

4. **Review error messages carefully:**
   - Read the full error in terminal
   - Google the specific error message
   - Check Stack Overflow

5. **Test with minimal setup:**
   - Test backend alone: `npm run dev:backend`
   - Test frontend alone: `npm run dev:frontend`
   - Test each part individually

---

## ✅ Verification Checklist

Confirm these all work:

- [ ] Node.js and npm commands work
- [ ] LibreOffice `soffice --version` works
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:5173
- [ ] Can register a user
- [ ] Can login
- [ ] Can upload a file
- [ ] File converts to PDF
- [ ] Can download PDF
- [ ] PDF opens correctly

If all checked, the app is working! 🎉

---

**Need more help? Check:**
- `README.md` - Full documentation
- `QUICKSTART.md` - Setup guide  
- `PROJECT_SUMMARY.md` - Project overview

**Still stuck? Review the terminal output - it often contains the answer!**
