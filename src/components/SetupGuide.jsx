const SetupGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <svg className="h-8 w-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-blue-900">Setup Required</h2>
        </div>
        
        <p className="text-blue-800 mb-4">
          To use this PDF storage app, you need to create a storage bucket in your Appwrite console.
        </p>
        
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">Step-by-step setup:</h3>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Go to your <a href="https://cloud.appwrite.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Appwrite Console</a>
            </li>
            <li>Navigate to <strong>Storage</strong> → <strong>Create Bucket</strong></li>
            <li>Configure the bucket:
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                <li><strong>Bucket ID:</strong> <code className="bg-gray-100 px-1 rounded">user-pdfs</code></li>
                <li><strong>Name:</strong> User PDFs</li>
                <li><strong>File Security:</strong> Enabled</li>
                <li><strong>Max file size:</strong> 10485760 (10MB)</li>
                <li><strong>Allowed extensions:</strong> pdf</li>
              </ul>
            </li>
            <li>Set permissions:
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                <li><strong>Read:</strong> role:member</li>
                <li><strong>Create:</strong> role:member</li>
                <li><strong>Update:</strong> role:member</li>
                <li><strong>Delete:</strong> role:member</li>
              </ul>
            </li>
            <li>Save the bucket</li>
            <li>Refresh this page</li>
          </ol>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> The bucket ID must be exactly <code className="bg-yellow-100 px-1 rounded">user-pdfs</code> 
            to match the configuration in this app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;