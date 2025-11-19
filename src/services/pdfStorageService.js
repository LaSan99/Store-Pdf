import { storage, USER_PDFS_BUCKET_ID, MAX_FILE_SIZE } from '../lib/appwrite';
import { ID, Permission, Role } from 'appwrite';

class PDFStorageService {

  /**
   * Validate file before upload (all file types allowed)
   * @param {File} file
   * @throws {Error}
   */
  validateFile(file) {
    // Only check file size (10MB or whatever MAX_FILE_SIZE is)
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }
  }

  /**
   * Upload file
   * @param {File} file
   * @param {string} userId
   * @returns {Promise<Object>}
   */
  async uploadFile(file, userId) {
    try {
      // Validate size only
      this.validateFile(file);

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
      if (error.code === 404) {
        throw new Error(
          `Storage bucket '${USER_PDFS_BUCKET_ID}' not found. Please create the bucket in Appwrite console.`
        );
      }
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  /**
   * List user files
   */
  async getUserFiles() {
    try {
      const response = await storage.listFiles(USER_PDFS_BUCKET_ID);
      return response.files;
    } catch (error) {
      if (error.code === 404) {
        throw new Error(
          `Storage bucket '${USER_PDFS_BUCKET_ID}' not found. Please create the bucket in Appwrite console.`
        );
      }
      throw new Error(`Failed to fetch files: ${error.message}`);
    }
  }

  /**
   * Download URL
   */
  getFileDownloadUrl(fileId) {
    try {
      return storage.getFileDownload(USER_PDFS_BUCKET_ID, fileId);
    } catch (error) {
      throw new Error(`Failed to get download URL: ${error.message}`);
    }
  }

  /**
   * Preview URL
   */
  getFilePreviewUrl(fileId) {
    try {
      return storage.getFilePreview(USER_PDFS_BUCKET_ID, fileId);
    } catch (error) {
      throw new Error(`Failed to get preview URL: ${error.message}`);
    }
  }

  /**
   * Delete file
   */
  async deleteFile(fileId) {
    try {
      await storage.deleteFile(USER_PDFS_BUCKET_ID, fileId);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Format size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Format date
   */
  formatFileDate(dateString) {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  }
}

export default new PDFStorageService();
