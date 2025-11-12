import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();

  const fetchFiles = async () => {
    try {
      const response = await axios.get('/api/files/list');
      setFiles(response.data.files);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadSuccess = (data) => {
    setSuccessMessage(`✅ Successfully converted: ${data.file.originalName}`);
    
    // Refresh file list
    fetchFiles();

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const handleFileDeleted = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your files...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Upload and convert your files to PDF in seconds</p>
        </div>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <div className="dashboard-grid">
          <div className="dashboard-upload">
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div className="dashboard-files">
            <FileList files={files} onFileDeleted={handleFileDeleted} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
