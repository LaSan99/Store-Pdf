import { storage, USER_PDFS_BUCKET_ID, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '../lib/appwrite';
import { ID, Permission, Role } from 'appwrite';

class PDFStorageService {
  
  /**
   * Validate PDF file before upload
   * @param {File} file - The file to validate
   * @throws {Error} If file is invalid
   */
  // validateFile(file) {
  //   // Check file type
  //   if (!ALLOWED_FILE_TYPES.includes(file.type)) {
  //     throw new Error('Only PDF files are allowed');
  //   }

    // Check file size (10MB limit)
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }

    // // Additional check for PDF extension
    // if (!file.name.toLowerCase().endsWith('.pdf')) {
    //   throw new Error('File must have a .pdf extension');
    // }
  }

  /**
   * Upload PDF file to storage
   * @param {File} file - The PDF file to upload
   * @param {string} userId - The ID of the user uploading the file
   * @returns {Promise<Object>} The uploaded file data
   */
  async uploadFile(file, userId) {
    try {
      // Validate file before upload
      this.validateFile(file);

      // Create file with user-specific permissions
      const response = await storage.createFile(
        USER_PDFS_BUCKET_ID,
        ID.unique(),
        file,
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId))
        ]
      );

      return response;
    } catch (error) {
      // Check if the error is because the bucket doesn't exist
      if (error.code === 404) {
        throw new Error(`Storage bucket '${USER_PDFS_BUCKET_ID}' not found. Please create the bucket in your Appwrite console.`);
      }
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  /**
   * Get all PDF files for a specific user
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} Array of user's files
   */
  async getUserFiles(userId) {
    try {
      const response = await storage.listFiles(USER_PDFS_BUCKET_ID);
      
      // Filter files to only show those owned by the current user
      // Since we set permissions per user, this should already be filtered by Appwrite
      return response.files;
    } catch (error) {
      // Check if the error is because the bucket doesn't exist
      if (error.code === 404) {
        throw new Error(`Storage bucket '${USER_PDFS_BUCKET_ID}' not found. Please create the bucket in your Appwrite console.`);
      }
      throw new Error(`Failed to fetch files: ${error.message}`);
    }
  }

  /**
   * Get download URL for a file
   * @param {string} fileId - The ID of the file
   * @returns {string} Download URL
   */
  getFileDownloadUrl(fileId) {
    try {
      const url = storage.getFileDownload(USER_PDFS_BUCKET_ID, fileId);
      return url;
    } catch (error) {
      throw new Error(`Failed to get download URL: ${error.message}`);
    }
  }

  /**
   * Get file preview URL (for PDF preview)
   * @param {string} fileId - The ID of the file
   * @returns {string} Preview URL
   */
  getFilePreviewUrl(fileId) {
    try {
      const url = storage.getFilePreview(USER_PDFS_BUCKET_ID, fileId);
      return url;
    } catch (error) {
      throw new Error(`Failed to get preview URL: ${error.message}`);
    }
  }

  /**
   * Delete a file
   * @param {string} fileId - The ID of the file to delete
   * @returns {Promise<void>}
   */
  async deleteFile(fileId) {
    try {
      await storage.deleteFile(USER_PDFS_BUCKET_ID, fileId);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Format file date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  formatFileDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}

export default new PDFStorageService();
