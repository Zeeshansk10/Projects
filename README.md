# 📄 PDF Converter Web Application

A full-stack web application for converting various file formats (images, Word, Excel, PowerPoint, text) to PDF with user authentication and secure file handling.

## 🚀 Features

- **User Authentication** - Secure login/register with JWT and bcrypt
- **File Upload** - Drag & drop or file picker for multiple file types
- **PDF Conversion** - Convert images, documents, spreadsheets, presentations to PDF
- **Download Management** - Track and download your converted files
- **Auto Cleanup** - Automatic deletion of old files
- **Rate Limiting** - Protection against abuse
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🧱 Tech Stack

**Frontend:**
- React 18 + Vite
- React Router for navigation
- Axios for API calls
- Modern CSS with responsive design

**Backend:**
- Node.js + Express.js
- JWT authentication
- Multer for file uploads
- LibreOffice for document conversion
- pdf-lib for image to PDF conversion
- node-cron for scheduled cleanup

## 📋 Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/

2. **LibreOffice** (for document conversion)

   **Windows:**
   ```cmd
   winget install TheDocumentFoundation.LibreOffice
   ```
   Or download from: https://www.libreoffice.org/download/download/
   
   After installation, add LibreOffice to PATH:
   - Default path: `C:\Program Files\LibreOffice\program`
   - Add to System Environment Variables

   **macOS:**
   ```bash
   brew install --cask libreoffice
   ```

   **Linux (Ubuntu/Debian):**
   ```bash
   sudo apt update
   sudo apt install libreoffice
   ```

   **Linux (Fedora/RHEL):**
   ```bash
   sudo dnf install libreoffice
   ```

   **Verify installation:**
   ```bash
   soffice --version
   ```

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

```bash
cd "c:\Users\HP\Desktop\MY Project\NEW"
```

### 2. Install Dependencies

**Option A - Install all at once:**
```bash
npm run install:all
```

**Option B - Install manually:**
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
cd ..
```

### 3. Environment Configuration

Create `.env` file in the `backend` folder:

```bash
# Windows
copy .env.example backend\.env

# macOS/Linux
cp .env.example backend/.env
```

Edit `backend/.env` and update the JWT_SECRET:
```env
JWT_SECRET=your_unique_secret_key_here_change_this
```

### 4. Create Required Directories

The application will create these automatically, but you can create them manually:

```bash
# Windows
mkdir backend\uploads backend\converted

# macOS/Linux
mkdir -p backend/uploads backend/converted
```

## 🏃 Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

Open your browser to `http://localhost:5173`

### Run Separately

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

### Production Build

1. Build the frontend:
```bash
npm run build
```

2. Start the backend:
```bash
npm start
```

3. The backend will serve the built frontend at `http://localhost:5000`

## 📁 Project Structure

```
pdf-converter/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── fileController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── files.js
│   ├── utils/
│   │   ├── converter.js
│   │   └── cleanup.js
│   ├── data/
│   │   └── users.json
│   ├── uploads/
│   ├── converted/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   └── FileList.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

## 🎯 Usage

1. **Register** a new account
2. **Login** with your credentials
3. **Upload** files (supported formats: jpg, png, gif, bmp, docx, doc, xlsx, xls, pptx, ppt, txt, pdf)
4. **Download** converted PDFs from your file list
5. Files are automatically deleted after 30 minutes

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- File type validation
- File size limits (20MB max)
- Rate limiting on uploads
- CORS protection
- Automatic file cleanup

## 🧪 Testing

### Supported File Types

- **Images:** .jpg, .jpeg, .png, .gif, .bmp
- **Documents:** .docx, .doc, .txt
- **Spreadsheets:** .xlsx, .xls
- **Presentations:** .pptx, .ppt
- **PDFs:** .pdf (pass-through)

### Sample Test Files

Create test files in a `test-files` folder:
- `sample.jpg` - Any image
- `document.docx` - Word document
- `spreadsheet.xlsx` - Excel file
- `presentation.pptx` - PowerPoint file
- `notes.txt` - Text file

## ⚠️ Troubleshooting

### LibreOffice Not Found

**Error:** `LibreOffice not found`

**Solution:**
1. Verify LibreOffice is installed: `soffice --version`
2. Add to PATH (Windows):
   - Right-click "This PC" → Properties → Advanced System Settings
   - Environment Variables → System Variables → Path → Edit
   - Add: `C:\Program Files\LibreOffice\program`
   - Restart terminal/VS Code

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
Change PORT in `backend/.env` to another port (e.g., 5001)

### CORS Errors

Make sure `FRONTEND_URL` in `backend/.env` matches your frontend dev server URL.

### File Upload Fails

1. Check `uploads` and `converted` directories exist
2. Verify file size is under 20MB
3. Check file type is supported

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### File Operations (Protected)
- `POST /api/files/convert` - Upload and convert file
- `GET /api/files/list` - Get user's converted files
- `GET /api/files/download/:filename` - Download converted PDF

## 🎨 Customization

### Change File Size Limit

Edit `backend/.env`:
```env
MAX_FILE_SIZE=50  # 50MB
```

### Change File Retention Time

Edit `backend/.env`:
```env
FILE_RETENTION_MINUTES=60  # 1 hour
```

### Add More File Types

Edit `backend/middleware/upload.js` and add to `fileFilter` function.

## 📦 Dependencies

### Backend
- express - Web framework
- multer - File upload handling
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- libreoffice-convert - Document conversion
- pdf-lib - PDF manipulation
- node-cron - Scheduled tasks
- express-rate-limit - Rate limiting

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

## 👨‍💻 Author

Built with ❤️ using React, Node.js, and LibreOffice
