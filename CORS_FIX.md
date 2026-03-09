# 🚨 QUICK FIX FOR CORS ERROR

If you're seeing this error in your browser console:
```
Access to fetch at 'https://sfo.cloud.appwrite.io/v1/account' from origin 'https://store-pdf-three.vercel.app' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the request.
```

## ✅ Solution (Takes 2 minutes)

### Step 1: Open Appwrite Console
Go to: https://cloud.appwrite.io/console

### Step 2: Select Your Project
Click on your PDF Storage App project

### Step 3: Add Web Platform
1. Click **"Settings"** in the left sidebar
2. Click **"Platforms"** tab
3. Click **"Add Platform"** button
4. Select **"Web App"**

### Step 4: Enter Your Domain
Add these hostnames (one at a time):

**For Local Development:**
```
localhost
```

**For Vercel Production:**
```
store-pdf-three.vercel.app
```
(Replace with your actual Vercel domain if different)

**⚠️ IMPORTANT FORMATTING:**
- ❌ DON'T include: `https://` or `http://`
- ❌ DON'T include: Trailing slash `/`
- ✅ DO use: Just the hostname

**Examples:**
- ❌ Wrong: `https://store-pdf-three.vercel.app/`
- ❌ Wrong: `http://localhost:5173`
- ✅ Correct: `store-pdf-three.vercel.app`
- ✅ Correct: `localhost`

### Step 5: Save and Test
1. Click **"Next"** or **"Save"**
2. Wait 1-2 minutes for changes to propagate
3. Clear your browser cache (Ctrl+Shift+Delete)
4. Reload your application
5. Try logging in again

## 🎯 That's It!

The CORS error should now be resolved. If you still see issues:
1. Double-check the hostname is exactly correct
2. Make sure there are no extra spaces
3. Try in an incognito/private browser window
4. Check the browser console for any new error messages

## 📚 Need More Help?

See the complete guide: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🔧 Additional Setup

Don't forget to also:
1. Copy `.env.example` to `.env`
2. Update `.env` with your Appwrite Project ID
3. Create the `user-pdfs` storage bucket in Appwrite
4. Enable email/password authentication

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete instructions.
