# Complete Setup Guide for PDF Storage App

This guide will help you set up the application to work with Appwrite, including fixing CORS errors.

## Prerequisites

- Node.js 18 or higher
- An Appwrite account (sign up at [https://cloud.appwrite.io](https://cloud.appwrite.io))

## Step-by-Step Setup

### 1. Create Appwrite Project

1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io/console)
2. Click "Create Project"
3. Enter a project name (e.g., "PDF Storage App")
4. Note down your **Project ID** (you'll need this later)

### 2. Configure Web Platform (CRITICAL - Fixes CORS errors!)

**This step is essential to prevent CORS errors!**

1. In your Appwrite project, go to **Settings** → **Platforms**
2. Click **"Add Platform"**
3. Select **"Web App"**
4. Configure the platform:
   - **Name**: Your app name (e.g., "PDF Storage Web")
   - **Hostname**: Add your domain(s):
     - For local development: `localhost`
     - For Vercel deployment: `store-pdf-three.vercel.app` (or your custom domain)
     - **Important**: Do NOT include `http://` or `https://` - just the hostname
5. Click **"Next"** or **"Save"**

**Common Mistakes to Avoid:**
- ❌ Adding `https://store-pdf-three.vercel.app` (includes protocol)
- ❌ Adding `store-pdf-three.vercel.app/` (includes trailing slash)
- ✅ Correct: `store-pdf-three.vercel.app`

**Multiple Platforms:**
You can add multiple platforms for different environments:
- Add `localhost` for local development
- Add your Vercel domain for production
- Add custom domains if you have them

### 3. Enable Authentication

1. Go to **Auth** → **Settings**
2. Enable **Email/Password** authentication
3. Configure session settings:
   - Session length: Set as needed (default: 365 days)
   - Keep other settings as default

### 4. Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **"Create Bucket"**
3. Configure the bucket:
   - **Bucket ID**: `user-pdfs` (must match your .env file)
   - **Name**: User PDFs
   - **Permissions**: Configure as follows:
     - **Read**: Select "Any" or "Users" (allows logged-in users)
     - **Create**: Select "Users" (allows logged-in users to upload)
     - **Update**: Select "Users" (allows logged-in users to update)
     - **Delete**: Select "Users" (allows logged-in users to delete)
   - **File Security**: Enable (recommended)
   - **Maximum file size**: 10 MB (10485760 bytes)
   - **Allowed file extensions**: Add `pdf` (or leave empty to allow all files)
4. Click **"Create"**

### 5. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Appwrite details:
   ```env
   VITE_APPWRITE_PROJECT_ID="your-actual-project-id"
   VITE_APPWRITE_PROJECT_NAME="PDF Storage App"
   VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
   VITE_APPWRITE_BUCKET_ID="user-pdfs"
   ```

### 6. Install and Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Deployment on Vercel

### Initial Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables in Vercel:
   - Add `VITE_APPWRITE_PROJECT_ID`
   - Add `VITE_APPWRITE_ENDPOINT`
   - Add `VITE_APPWRITE_BUCKET_ID`
5. Deploy

### After First Deployment - Add Platform to Appwrite

**CRITICAL**: After your first Vercel deployment, you must add the Vercel domain to Appwrite!

1. Note your Vercel deployment URL (e.g., `store-pdf-three.vercel.app`)
2. Go back to Appwrite Console → Settings → Platforms
3. Add a new Web platform with your Vercel hostname
4. Redeploy your Vercel app or clear browser cache

## Troubleshooting

### CORS Error: "Access to fetch... has been blocked by CORS policy"

**Solution**: 
1. Go to Appwrite Console → Settings → Platforms
2. Verify your domain is added as a Web platform
3. Make sure you added ONLY the hostname (no `http://`, `https://`, or trailing `/`)
4. Wait a few minutes for changes to propagate
5. Clear your browser cache and reload the page

### Error: "Cannot read properties of undefined (reading 'name')"

**Solution**: This error occurs when the user object is not loaded. The app now has better error handling for this.

### Error: "Storage bucket 'user-pdfs' not found"

**Solution**:
1. Go to Appwrite Console → Storage
2. Create a bucket with ID: `user-pdfs`
3. Configure permissions as described in Step 4 above

### Error: "Failed to load resource: net::ERR_FAILED"

**Solution**: This usually accompanies CORS errors. Follow the CORS error solution above.

### Environment Variables Not Working

**Solution**:
1. Make sure your `.env` file is in the project root
2. Restart the development server (`npm run dev`)
3. For Vercel, make sure environment variables are set in the Vercel dashboard
4. Redeploy after changing Vercel environment variables

## Security Best Practices

1. **Never commit `.env` file** - it's already in `.gitignore`
2. **Use environment variables** for all sensitive configuration
3. **Enable File Security** in your Appwrite storage bucket
4. **Review bucket permissions** to ensure users can only access their own files
5. **Keep Appwrite SDK updated** for security patches

## Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Storage Guide](https://appwrite.io/docs/products/storage)
- [Appwrite Authentication Guide](https://appwrite.io/docs/products/auth)
- [Appwrite Platform Configuration](https://appwrite.io/docs/advanced/platform/web)

## Getting Help

If you encounter issues:
1. Check the browser console for specific error messages
2. Verify all environment variables are set correctly
3. Ensure Appwrite platform is configured with the correct hostname
4. Check Appwrite Console for bucket and authentication settings
5. Review this guide's troubleshooting section

For Appwrite-specific issues, visit [Appwrite Discord](https://appwrite.io/discord) or [GitHub Discussions](https://github.com/appwrite/appwrite/discussions).
