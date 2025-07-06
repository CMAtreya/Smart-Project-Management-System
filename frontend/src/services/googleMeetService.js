// Google Meet Service for creating real meetings
// Uses Google Calendar API to create actual Google Meet meetings

class GoogleMeetService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_API_KEY || null;
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || null;
    this.scope = 'https://www.googleapis.com/auth/calendar';
  }

  // Initialize Google API
  async initializeGoogleAPI() {
    return new Promise((resolve, reject) => {
      // Check if environment variables are set
      if (!this.apiKey || !this.clientId) {
        reject(new Error('Google API credentials not configured. Please set VITE_GOOGLE_API_KEY and VITE_GOOGLE_CLIENT_ID in your .env file.'));
        return;
      }

      // Check if Google API is loaded
      if (typeof window.gapi === 'undefined') {
        // Wait for Google API to load
        let attempts = 0;
        const maxAttempts = 10;
        
        const checkGapi = () => {
          attempts++;
          if (typeof window.gapi !== 'undefined') {
            this.loadGapiClient(resolve, reject);
          } else if (attempts < maxAttempts) {
            setTimeout(checkGapi, 500);
          } else {
            reject(new Error('Google API failed to load. Please check your internet connection and try again.'));
          }
        };
        
        checkGapi();
      } else {
        this.loadGapiClient(resolve, reject);
      }
    });
  }

  // Load Google API client
  loadGapiClient(resolve, reject) {
    window.gapi.load('client:auth2', async () => {
      try {
        await window.gapi.client.init({
          apiKey: this.apiKey,
          clientId: this.clientId,
          scope: this.scope,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Create a real Google Meet meeting
  async createMeeting(meetingDetails = {}) {
    try {
      // Check if user is authenticated
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await window.gapi.auth2.getAuthInstance().signIn();
      }

      const defaultDetails = {
        summary: 'Team Meeting - Smart Project Management',
        description: 'Team collaboration meeting created from Communication Hub',
        start: {
          dateTime: new Date().toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(2, 15),
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        }
      };

      const finalDetails = { ...defaultDetails, ...meetingDetails };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: finalDetails,
        conferenceDataVersion: 1
      });

      if (response.result.conferenceData) {
        return {
          success: true,
          meetingLink: response.result.conferenceData.entryPoints[0].uri,
          meetingId: response.result.conferenceData.conferenceId,
          eventId: response.result.id,
          joinUrl: response.result.conferenceData.entryPoints[0].uri,
          isReal: true
        };
      } else {
        throw new Error('No conference data received from Google Calendar API');
      }
    } catch (error) {
      console.error('Error creating Google Meet:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Join meeting and get the current meeting link
  async joinMeeting(meetingLink) {
    try {
      // Open the meeting in a new tab
      const meetWindow = window.open(meetingLink, '_blank', 'noopener,noreferrer');
      
      if (meetWindow) {
        meetWindow.focus();
        
        // Wait a moment for the meeting to load, then get the current URL
        setTimeout(() => {
          try {
            // Try to get the current URL from the meeting window
            const currentUrl = meetWindow.location.href;
            if (currentUrl && currentUrl !== 'about:blank') {
              // Copy the current meeting URL to clipboard
              this.copyToClipboard(currentUrl);
              return { success: true, meetingUrl: currentUrl };
            }
          } catch (crossOriginError) {
            // Cross-origin restrictions prevent accessing the URL
            console.log('Cannot access meeting URL due to cross-origin restrictions');
          }
        }, 2000);
        
        return { success: true, meetingUrl: meetingLink };
      } else {
        throw new Error('Failed to open meeting window');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Copy text to clipboard
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return { success: true };
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        return { success: true };
      }
    } catch (error) {
      console.error('Clipboard error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get meeting details
  async getMeetingDetails(eventId) {
    try {
      const response = await window.gapi.client.calendar.events.get({
        calendarId: 'primary',
        eventId: eventId
      });
      return { success: true, meeting: response.result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new GoogleMeetService(); 