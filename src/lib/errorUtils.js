/**
 * Utility functions for error handling
 */

/**
 * Format authentication error messages with helpful hints
 * @param {Error} error - The error object from authentication attempt
 * @returns {string} - User-friendly error message
 */
export const formatAuthError = (error) => {
  let errorMessage = error.message || 'An error occurred';
  
  // Check for network/CORS errors
  if (
    error.message?.includes('fetch') || 
    error.message?.includes('NetworkError') || 
    error.type === 'network' ||
    error.message?.includes('Failed to fetch')
  ) {
    return '🚨 Connection Error: Unable to reach Appwrite server. This is usually a CORS configuration issue. Please check CORS_FIX.md in the project root for instructions.';
  }
  
  return errorMessage;
};
