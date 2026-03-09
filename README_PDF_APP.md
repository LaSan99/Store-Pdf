# PDF Storage App with Appwrite

A React web application for storing and managing PDF files using Appwrite as the backend. Users can securely upload, download, and delete their PDF files with user-based access control.

## ⚠️ Getting CORS Errors?

**If you see "Access to fetch... has been blocked by CORS policy" errors:**

👉 **[CLICK HERE FOR QUICK 2-MINUTE FIX](./CORS_FIX.md)** 👈

This is the #1 most common setup issue!

## 🚀 Live Demo

**[View Live App](https://store-pdf-three.vercel.app/)**

## Features

- **User Authentication**: Email/password registration and login
- **Secure PDF Upload**: Drag & drop or click to upload PDF files
- **File Management**: View, download, and delete uploaded PDFs
- **File Validation**: PDF format validation and 10MB size limit
- **User Isolation**: Each user can only access their own files
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Vite
- **Backend**: Appwrite (Authentication, Storage)
- **File Storage**: Appwrite Storage with user-based permissions

## Prerequisites

1. **Appwrite Instance**: You need an Appwrite server instance
   - Cloud: [https://cloud.appwrite.io](https://cloud.appwrite.io)
   - Self-hosted: [Appwrite Installation Guide](https://appwrite.io/docs/installation)

2. **Node.js**: Version 18 or higher

## ⚠️ IMPORTANT: Fixing CORS Errors

If you're getting **CORS errors** (like "Access to fetch... has been blocked by CORS policy"), you MUST configure your domain in Appwrite:

1. Go to [Appwrite Console](https://cloud.appwrite.io/console) → Your Project
2. Navigate to **Settings → Platforms**
3. Click **"Add Platform"** → Select **"Web App"**
4. Add your hostname:
   - For local development: `localhost`
   - For Vercel: `store-pdf-three.vercel.app` (or your custom domain)
   - **❌ Wrong**: `https://your-app.vercel.app` (includes protocol)
   - **✅ Correct**: `your-app.vercel.app` (hostname only)

**See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.**

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd starter-for-react
npm install
```

### 2. Appwrite Configuration

**📖 For complete step-by-step instructions with screenshots, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

1. **Create a new project** in your Appwrite console

2. **⚠️ CRITICAL - Add Web Platform** (fixes CORS errors):
   - Go to Settings → Platforms → Add Platform → Web App
   - Add hostname: `localhost` (for development) and your production domain
   - **DO NOT** include `http://`, `https://`, or trailing `/`

3. **Configure Authentication**:
   - Go to Auth → Settings
   - Enable Email/Password authentication
   - Set session length as needed

4. **Create Storage Bucket**:
   - Go to Storage → Create Bucket
   - Name: `user-pdfs`
   - Permissions: 
     - **Read access**: Users (logged in users can read)
     - **Create access**: Users (logged in users can create)
     - **Update access**: Users (logged in users can update)
     - **Delete access**: Users (logged in users can delete)
   - File Security: Enabled
   - Maximum file size: 10MB
   - Allowed file extensions: `pdf`

5. **Get your Project ID**:
   - Go to Settings → General
   - Copy your Project ID for the next step

### 3. Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your Appwrite details:
```env
VITE_APPWRITE_PROJECT_ID="your-project-id"
VITE_APPWRITE_PROJECT_NAME="your-project-name"
VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
VITE_APPWRITE_BUCKET_ID="user-pdfs"
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to use the application.

## Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.jsx    # Main dashboard with upload/list
│   ├── FileList.jsx     # File listing and management
│   ├── FileUpload.jsx   # File upload component
│   ├── Login.jsx        # Login form
│   └── Register.jsx     # Registration form
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication context
├── lib/                 # Configuration
│   └── appwrite.js      # Appwrite client setup
├── services/            # Business logic
│   └── pdfStorageService.js # PDF storage operations
├── App.jsx              # Main app component
└── main.jsx            # App entry point
```

## Key Features Explained

### Authentication
- Uses Appwrite's built-in email/password authentication
- Automatic session management with persistent login
- Protected routes that require authentication

### File Storage
- **PDF Validation**: Only allows PDF files up to 10MB
- **User Isolation**: Files are linked to users via Appwrite permissions
- **Secure Access**: Each file has user-specific read/write permissions
- **File Operations**: Upload, download, delete with proper error handling

### Security
- **File Type Validation**: Frontend and backend validation for PDF files
- **Size Limits**: 10MB maximum file size enforced
- **User Permissions**: Appwrite handles user-based file access automatically
- **Session Management**: Secure session handling with automatic logout

## Usage

1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Upload**: Drag and drop or click to upload PDF files
4. **Manage**: View your files, download them, or delete as needed
5. **Logout**: Securely sign out when done

## Error Handling

The app includes comprehensive error handling for:
- Network connectivity issues
- Invalid file types or sizes
- Authentication failures
- Upload/download failures
- Permission errors

## Development

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **Business Logic**: Add to `src/services/`
3. **State Management**: Use React Context or add new contexts

### Environment Variables

All Appwrite configuration is handled through environment variables:
- `VITE_APPWRITE_ENDPOINT`: Your Appwrite server URL
- `VITE_APPWRITE_PROJECT_ID`: Your project ID from Appwrite console
- `VITE_APPWRITE_PROJECT_NAME`: Display name for your project
- `VITE_APPWRITE_BUCKET_ID`: Storage bucket ID (default: "user-pdfs")

## Production Deployment

1. **Build the app**:
```bash
npm run build
```

2. **Deploy** the `dist` folder to your hosting provider

3. **Update environment variables** for production:
   - Set production Appwrite endpoint
   - Configure CORS for your production domain
   - Ensure storage bucket is properly configured

## Troubleshooting

### Common Issues

**For detailed troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

1. **⚠️ CORS errors: "Access to fetch... has been blocked by CORS policy"**
   - **Solution**: Go to Appwrite Console → Settings → Platforms → Add your domain as a Web platform
   - Add ONLY the hostname (e.g., `your-app.vercel.app`, NOT `https://your-app.vercel.app`)
   - This is the most common issue - see SETUP_GUIDE.md for step-by-step instructions

2. **"Cannot read properties of undefined (reading 'name')"**: 
   - Check environment variables are set correctly
   - Clear browser cache and reload
   - Verify Appwrite project configuration

3. **Upload failures**: 
   - Verify storage bucket exists and has correct permissions
   - Check bucket ID matches your .env file (`user-pdfs`)

4. **Authentication errors**: 
   - Check if email/password auth is enabled in Appwrite
   - Verify your platform is configured in Appwrite Console

### Storage Bucket Permissions

Ensure your `user-pdfs` bucket has these permissions:
- Read: `role:member` (logged-in users)
- Create: `role:member` 
- Update: `role:member`
- Delete: `role:member`

## License

MIT License - see LICENSE file for details.