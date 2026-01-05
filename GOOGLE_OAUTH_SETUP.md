# 🔐 Google OAuth Setup Instructions

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "DocClinic" → Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click it and press "Enable"

## Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: DocClinic
   - User support email: Your email
   - Developer contact: Your email
   - Click "Save and Continue" through all steps

4. Back to "Create OAuth Client ID":
   - Application type: **Web application**
   - Name: DocClinic Web Client
   
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   http://localhost:3001
   ```
   (Add your production URL later)

6. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000
   http://localhost:3001
   ```

7. Click "Create"
8. **Copy the Client ID** (looks like: xxxxx.apps.googleusercontent.com)

## Step 4: Add Client ID to Environment Files

### Frontend (.env in root folder):
Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:
```
REACT_APP_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

### Backend (backend/.env):
Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with the same Client ID:
```
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

## Step 5: Restart Servers

```bash
# Stop both servers (Ctrl+C), then restart:

# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm start
```

## ✅ Test Google Login

1. Open http://localhost:3000
2. Click "Book Appointment" or "Login"
3. You should see "Sign in with Google" button
4. Click it and sign in with your Google account
5. You should be logged in automatically!

## 🚀 For Production

When deploying, add your production URLs to:
- Google Cloud Console → Authorized origins/redirects
- Environment variables in your hosting platform (Netlify, Vercel, etc.)
