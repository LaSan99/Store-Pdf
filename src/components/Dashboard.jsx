import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from './FileUpload';
import FileList from './FileList';
import pdfStorageService from '../services/pdfStorageService';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  // Load user files on component mount
  useEffect(() => {
    loadFiles();
  }, [user]);

  const loadFiles = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    
    try {
      const userFiles = await pdfStorageService.getUserFiles(user.$id);
      setFiles(userFiles);
    } catch (error) {
      console.error('Failed to load files:', error);
      setError('Failed to load files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (uploadedFile) => {
    // Add the new file to the beginning of the list
    setFiles(prevFiles => [uploadedFile, ...prevFiles]);
  };

  const handleFileDeleted = (fileId) => {
    // Remove the deleted file from the list
    setFiles(prevFiles => prevFiles.filter(file => file.$id !== fileId));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PDF Storage</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {user?.name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <FileUpload onUploadSuccess={handleUploadSuccess} />
                </div>
              </div>
            </div>

            {/* Files Section */}
            <div className="lg:col-span-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error Loading Files</h3>
                          <div className="mt-1 text-sm text-red-700">
                            {error}
                            {error.includes('not found') && (
                              <div className="mt-2 text-sm">
                                <p><strong>To fix this:</strong></p>
                                <ol className="list-decimal list-inside mt-1 space-y-1">
                                  <li>Go to your Appwrite console</li>
                                  <li>Navigate to Storage → Create Bucket</li>
                                  <li>Set Bucket ID to: <code className="bg-red-100 px-1 rounded">user-pdfs</code></li>
                                  <li>Configure permissions for logged-in users</li>
                                </ol>
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <button
                              onClick={loadFiles}
                              className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                            >
                              Try again
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-2 text-gray-600">Loading files...</span>
                    </div>
                  ) : (
                    <FileList 
                      files={files} 
                      onFileDeleted={handleFileDeleted} 
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;