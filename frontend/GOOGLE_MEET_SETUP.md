# Google Meet API Setup Guide

This guide will help you set up the Google Meet API to create real Google Meet meetings from the Communication Hub.

## Prerequisites

1. A Google account
2. Google Cloud Console access
3. Basic knowledge of APIs

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "Smart Project Management")
4. Click "Create"

## Step 2: Enable Google Calendar API

1. In your Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Calendar API"
3. Click on "Google Calendar API"
4. Click "Enable"

## Step 3: Create Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: "Smart Project Management"
   - User support email: Your email
   - Developer contact information: Your email
4. Click "Save and Continue" through the remaining steps
5. Back to credentials, click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Application type: "Web application"
7. Name: "Smart Project Management Web Client"
8. Authorized JavaScript origins: Add your development URL (e.g., `http://localhost:5173`)
9. Click "Create"
10. Copy the Client ID

## Step 4: Create API Key

1. In "Credentials", click "Create Credentials" → "API Key"
2. Copy the API Key
3. (Optional) Click "Restrict Key" and restrict it to Google Calendar API

## Step 5: Configure Environment Variables

1. Create a `.env` file in your frontend directory
2. Add the following variables:

```env
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

## Step 6: Add Google API Script

1. Open `index.html` in your frontend directory
2. Add this script tag in the `<head>` section:

```html
<script src="https://apis.google.com/js/api.js"></script>
```

## Step 7: Test the Integration

1. Start your development server
2. Go to the Communication Hub
3. Click the video call button
4. You should be prompted to sign in to Google
5. After signing in, a real Google Meet will be created

## Troubleshooting

### "Google API credentials not configured"
- Check that your `.env` file exists and has the correct variable names
- Ensure the environment variables start with `VITE_`
- Restart your development server after adding environment variables

### "Google API not loaded"
- Check that the Google API script is included in your `index.html`
- Ensure you're running the app from a web server (not file://)

### "Failed to create Google Meet"
- Verify that Google Calendar API is enabled in your Google Cloud project
- Check that your OAuth consent screen is configured
- Ensure you're signed in to the correct Google account

### CORS Issues
- Add your production domain to the authorized JavaScript origins in Google Cloud Console
- For development, ensure `http://localhost:5173` (or your dev port) is added

## Security Notes

- Never commit your `.env` file to version control
- Restrict your API key to only the necessary APIs
- Use appropriate OAuth scopes for your application
- Regularly rotate your API keys

## Production Deployment

For production deployment:

1. Add your production domain to authorized JavaScript origins
2. Update your `.env` file with production credentials
3. Ensure your domain is verified in Google Cloud Console
4. Consider using environment-specific credential files

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all setup steps are completed
3. Test with a simple Google API call first
4. Check Google Cloud Console for API usage and errors 