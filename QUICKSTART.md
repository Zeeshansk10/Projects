# 🚀 Quick Start Guide - PDF Converter

## ⚡ Fast Setup (5 minutes)

### Step 1: Install LibreOffice (REQUIRED)

**Windows:**
```cmd
winget install TheDocumentFoundation.LibreOffice
```
Or download from: https://www.libreoffice.org/download/

**After installation, add to PATH:**
1. Search "Environment Variables" in Windows
2. Edit System Environment Variables → Environment Variables
3. Under System Variables, select "Path" → Edit
4. Add: `C:\Program Files\LibreOffice\program`
5. Restart your terminal/VS Code

**Verify installation:**
```cmd
soffice --version
```

---

### Step 2: Install Dependencies

**Option A - Automated (Windows):**
```cmd
setup.bat
```

**Option B - Manual:**

```cmd
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..\frontend
npm install
cd ..
```

---

### Step 3: Configure Environment

1. Copy the environment file:
```cmd
copy .env.example backend\.env
```

2. Edit `backend\.env` and change the JWT_SECRET:
```env
JWT_SECRET=your_unique_secret_key_here_12345
```

---

### Step 4: Run the Application

**Development mode (runs both frontend and backend):**
```cmd
npm run dev
```

This will start:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

**Or run separately:**

Backend only:
```cmd
npm run dev:backend
```

Frontend only:
```cmd
npm run dev:frontend
```

---

## 🎯 Using the Application

1. **Open your browser:** http://localhost:5173

2. **Register a new account:**
   - Click "Register"
   - Enter your name, email, and password
   - Click "Create Account"

3. **Upload and convert files:**
   - Drag & drop a file or click to upload
   - Supported formats: JPG, PNG, DOCX, XLSX, PPTX, TXT, PDF
   - Click "Convert to PDF"
   - Download your converted PDF

4. **Manage your files:**
   - View all converted files in the list
   - Download PDFs anytime
   - Delete files when done

---

## 📝 Testing

### Test with Sample File

A sample text file is provided in `test-files/sample.txt`

1. Login to the application
2. Upload `test-files/sample.txt`
3. Convert to PDF
4. Download and verify the PDF

### Create Your Own Test Files

- **Images:** Use any .jpg or .png photo
- **Documents:** Create a Word document (.docx)
- **Spreadsheets:** Create an Excel file (.xlsx)
- **Presentations:** Create a PowerPoint (.pptx)

---

## ❌ Troubleshooting

### LibreOffice Not Found

**Error:** "LibreOffice conversion failed"

**Solution:**
1. Make sure LibreOffice is installed: `soffice --version`
2. Add to PATH (see Step 1 above)
3. Restart your terminal and VS Code
4. Restart the application

### Port Already in Use

**Error:** "Port 5000 is already in use"

**Solution:**
1. Stop the running server (Ctrl+C)
2. Change PORT in `backend\.env`:
   ```env
   PORT=5001
   ```
3. Also update `FRONTEND_URL` if needed

### npm Command Not Found

**Error:** "'npm' is not recognized"

**Solution:**
1. Install Node.js from: https://nodejs.org/
2. Restart your terminal
3. Verify: `node --version` and `npm --version`

### CORS Errors

**Solution:**
Make sure `FRONTEND_URL` in `backend\.env` matches your frontend URL:
```env
FRONTEND_URL=http://localhost:5173
```

### File Upload Fails

**Checklist:**
- File size under 20MB?
- Supported file type?
- Backend server running?
- Check terminal for errors

---

## 🛠️ Production Build

1. Build the frontend:
```cmd
npm run build
```

2. Set environment to production in `backend\.env`:
```env
NODE_ENV=production
```

3. Start the server:
```cmd
npm start
```

4. Access the app at: http://localhost:5000

---

## 📂 Project Structure

```
pdf-converter/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & upload middleware
│   ├── routes/            # API routes
│   ├── utils/             # Converter & cleanup utilities
│   ├── data/              # User data (JSON file)
│   ├── uploads/           # Temporary uploaded files
│   ├── converted/         # Converted PDF files
│   └── server.js          # Express server
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Styles
│   └── index.html         # HTML template
├── test-files/            # Sample test files
├── package.json           # Root package file
├── .env.example           # Environment template
└── README.md              # Full documentation
```

---

## 🔒 Security Features

✅ Password hashing with bcrypt  
✅ JWT authentication  
✅ Protected API routes  
✅ File type validation  
✅ File size limits  
✅ Rate limiting  
✅ Automatic file cleanup  

---

## 📊 Features Checklist

- [x] User registration & login
- [x] JWT authentication
- [x] Image to PDF conversion (JPG, PNG)
- [x] Document conversion (DOCX, DOC)
- [x] Spreadsheet conversion (XLSX, XLS)
- [x] Presentation conversion (PPTX, PPT)
- [x] Text to PDF conversion
- [x] PDF pass-through
- [x] File upload with drag & drop
- [x] File download
- [x] File management
- [x] Automatic cleanup
- [x] Rate limiting
- [x] Responsive design
- [x] Error handling

---

## 💡 Tips

1. **Large files:** Files over 20MB won't upload (configurable in `.env`)
2. **File retention:** Files are auto-deleted after 30 minutes (configurable)
3. **Rate limiting:** Max 10 uploads per 15 minutes per user
4. **Multiple formats:** Upload different file types to test all converters
5. **Mobile:** The app is fully responsive - try on mobile!

---

## 🆘 Need Help?

1. Check the main README.md for detailed documentation
2. Verify all prerequisites are installed
3. Check the terminal for error messages
4. Make sure LibreOffice is in your PATH
5. Restart the application after making changes

---

## ✅ Success Criteria

You know it's working when:
- ✅ You can register and login
- ✅ You can upload files
- ✅ Files convert to PDF
- ✅ You can download PDFs
- ✅ No errors in the terminal

---

**🎉 Enjoy your PDF Converter!**
