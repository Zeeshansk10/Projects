import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError('');

    try {
      const response = await axios.post('/api/files/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form
      setFile(null);
      setUploading(false);
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.response?.data?.details || 'Upload failed');
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-card">
      <h2>Convert File to PDF</h2>
      <p className="subtitle">Upload images, documents, spreadsheets, or presentations</p>

      <form onSubmit={handleSubmit}>
        <div
          className={`drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png,.gif,.bmp,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.pdf"
          />
          
          {!file ? (
            <label htmlFor="file-input" className="drop-zone-label">
              <div className="drop-zone-icon">📎</div>
              <p className="drop-zone-text">
                <strong>Click to upload</strong> or drag and drop
              </p>
              <p className="drop-zone-hint">
                Supported: JPG, PNG, GIF, BMP, DOCX, XLSX, PPTX, TXT, PDF (max 20MB)
              </p>
            </label>
          ) : (
            <div className="file-preview">
              <div className="file-icon">📄</div>
              <div className="file-info">
                <p className="file-name">{file.name}</p>
                <p className="file-size">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                className="btn-remove"
                onClick={() => setFile(null)}
                title="Remove file"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="alert alert-error">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <span className="spinner-small"></span>
              Converting...
            </>
          ) : (
            <>
              ⚡ Convert to PDF
            </>
          )}
        </button>
      </form>

      <div className="supported-formats">
        <h4>Supported Formats:</h4>
        <div className="format-tags">
          <span className="tag">Images (JPG, PNG, GIF, BMP)</span>
          <span className="tag">Documents (DOCX, DOC, TXT)</span>
          <span className="tag">Spreadsheets (XLSX, XLS)</span>
          <span className="tag">Presentations (PPTX, PPT)</span>
          <span className="tag">PDF</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
