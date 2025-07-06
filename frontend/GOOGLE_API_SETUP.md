# Google Meet API Setup Guide

## Prerequisites
1. A Google account
2. Access to Google Cloud Console

## Step-by-Step Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your Project ID

### 2. Enable Google Calendar API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### 3. Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to Google Calendar API for security

### 4. Create OAuth 2.0 Client ID
1. In "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `http://localhost:5173` (for Vite development)
   - Your production domain (when deployed)
5. Copy the generated Client ID

### 5. Configure Environment Variables
Create a `.env` file in the `frontend` directory with:

```env
REACT_APP_GOOGLE_API_KEY=your_actual_api_key_here
REACT_APP_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

### 6. Test the Integration
1. Start your development server
2. Click the video call button in the chat
3. You should be prompted to sign in with Google
4. After authorization, a Google Meet link will be created and shared

## Features
- ✅ Automatic Google Meet link generation
- ✅ Calendar event creation with meeting details
- ✅ Auto-sharing of meeting links in chat
- ✅ Fallback to manual link generation if API fails
- ✅ Professional meeting modal with copy/join options
- ✅ Loading states and error handling

## Troubleshooting
- If you get "API not enabled" errors, make sure Google Calendar API is enabled
- If authentication fails, check your OAuth client ID and origins
- If the API key doesn't work, ensure it's not restricted or has the right permissions
- Check browser console for detailed error messages

## Security Notes
- Never commit your `.env` file to version control
- Use environment-specific API keys for development/production
- Restrict API keys to specific domains and APIs
- Regularly rotate your API keys 