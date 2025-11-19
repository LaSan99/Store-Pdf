import { useState, useRef } from 'react';
import pdfStorageService from '../services/pdfStorageService';
import { useAuth } from '../contexts/AuthContext';

const FileUpload = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const { user } = useAuth();

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
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setError('');
    setUploading(true);

    try {
      // Validate file using the service
      pdfStorageService.validateFile(file);
      
      // Upload file
      const uploadedFile = await pdfStorageService.uploadFile(file, user.$id);
      
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      
      // Notify parent component of successful upload
      onUploadSuccess(uploadedFile);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload PDF File
        </h3>
        <p className="text-sm text-gray-600">
          Upload PDF files up to 10MB. Only PDF format is supported.
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors ${
          dragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-8 h-8 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF files only, up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
