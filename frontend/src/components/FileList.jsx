import React from 'react';
import axios from 'axios';

const FileList = ({ files, onFileDeleted }) => {
  const [deleting, setDeleting] = React.useState(null);

  const handleDownload = async (file) => {
    try {
      const response = await axios.get(`/api/files/download/${file.convertedName}`, {
        responseType: 'blob'
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.convertedName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

  const handleDelete = async (file) => {
    if (!window.confirm(`Delete ${file.originalName}?`)) {
      return;
    }

    setDeleting(file.id);

    try {
      await axios.delete(`/api/files/${file.convertedName}`);
      if (onFileDeleted) {
        onFileDeleted(file.id);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (!files || files.length === 0) {
    return (
      <div className="file-list-card">
        <h2>Your Converted Files</h2>
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No files converted yet</p>
          <p className="empty-hint">Upload a file above to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="file-list-card">
      <h2>Your Converted Files ({files.length})</h2>
      <div className="file-list">
        {files.map((file) => (
          <div key={file.id} className="file-item">
            <div className="file-item-icon">📄</div>
            <div className="file-item-info">
              <h4 className="file-item-name">{file.originalName}</h4>
              <p className="file-item-meta">
                {formatFileSize(file.size)} • {formatDate(file.convertedAt)}
              </p>
            </div>
            <div className="file-item-actions">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleDownload(file)}
                title="Download PDF"
              >
                ⬇️ Download
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(file)}
                disabled={deleting === file.id}
                title="Delete file"
              >
                {deleting === file.id ? '...' : '🗑️'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
