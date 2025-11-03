import { Client, Account, Storage } from "appwrite";

// Check if required environment variables are defined
if (!import.meta.env.VITE_APPWRITE_ENDPOINT) {
    throw new Error('VITE_APPWRITE_ENDPOINT is not defined in environment variables');
}

if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
    throw new Error('VITE_APPWRITE_PROJECT_ID is not defined in environment variables');
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
