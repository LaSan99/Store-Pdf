import { Client, Account, Storage } from "appwrite";

// Check if required environment variables are defined
if (!import.meta.env.VITE_APPWRITE_ENDPOINT) {
    throw new Error(`
        ❌ VITE_APPWRITE_ENDPOINT is not defined in environment variables.
        
        Please follow these steps:
        1. Copy .env.example to .env
        2. Update VITE_APPWRITE_ENDPOINT with your Appwrite server URL
        3. See SETUP_GUIDE.md for complete setup instructions
    `);
}

if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
    throw new Error(`
        ❌ VITE_APPWRITE_PROJECT_ID is not defined in environment variables.
        
        Please follow these steps:
        1. Copy .env.example to .env
        2. Update VITE_APPWRITE_PROJECT_ID with your project ID from Appwrite Console
        3. See SETUP_GUIDE.md for complete setup instructions
    `);
}

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const storage = new Storage(client);

// Storage bucket ID for user PDFs - get from environment variables
export const USER_PDFS_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'user-pdfs';

// PDF file constraints
export const MAX_FILE_SIZE = 40 * 1024 * 1024; // 10MB in bytes
export const ALLOWED_FILE_TYPES = ['application/pdf'];

export { client, account, storage };
