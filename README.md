# React starter kit with Appwrite

Kickstart your React development with this ready-to-use starter project integrated with [Appwrite](https://www.appwrite.io)

## 🚀Getting started

### Clone the Project
Clone this repository to your local machine using Git:

`git clone https://github.com/appwrite/starter-for-react`

## 🛠️ Development guide

### Quick Setup
1. **Configure Appwrite**<br/>
   Follow the comprehensive [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete Appwrite configuration, including:
   - Creating your Appwrite project
   - **Fixing CORS errors** by adding your domain as a platform
   - Setting up authentication and storage
   - Configuring environment variables

2. **Environment Variables**<br/>
   Copy `.env.example` to `.env` and update the values to match your Appwrite project credentials.

3. **Install dependencies**<br/>
   Run `npm install` to install all dependencies.

4. **Run the app**<br/>
   Start the project by running `npm run dev`.

## 🔧 Troubleshooting CORS Errors

If you see **"Access to fetch... has been blocked by CORS policy"** errors:

1. Go to your [Appwrite Console](https://cloud.appwrite.io/console)
2. Navigate to **Settings → Platforms**
3. Click **"Add Platform"** → **"Web App"**
4. Add your domain hostname (e.g., `localhost` for development or `your-app.vercel.app` for production)
   - ⚠️ **Important**: Use ONLY the hostname, not the full URL
   - ❌ Wrong: `https://your-app.vercel.app`
   - ✅ Correct: `your-app.vercel.app`

For more detailed troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## 💡 Additional notes
- This starter project is designed to streamline your React development with Appwrite.
- Refer to the [Appwrite documentation](https://appwrite.io/docs) for detailed integration guidance.
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup and troubleshooting instructions.