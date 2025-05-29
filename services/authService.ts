import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Complete the web browser session on web platform
WebBrowser.maybeCompleteAuthSession();

export interface AuthResult {
  canisterId?: string;
  success: boolean;
  error?: string;
}

class AuthService {
  private authUrl: string;
  private redirectUri: string;

  constructor() {
    // Your authentication server URL
    this.authUrl = 'https://zap-web-auth-t8vc.vercel.app/';

    // Create redirect URI for your app
    this.redirectUri = AuthSession.makeRedirectUri({
      scheme: 'zap-x',
      path: 'auth',
    });
  }

  /**
   * Method 2: Using expo-web-browser (More control)
   * Opens browser and listens for redirect
   */
  async authenticateWithWebBrowser(): Promise<AuthResult> {
    try {
      // Construct the auth URL with redirect parameter
      const authUrlWithRedirect = `${this.authUrl}?redirect_uri=${encodeURIComponent(this.redirectUri)}`;

      // Open the browser
      const result = await WebBrowser.openAuthSessionAsync(
        authUrlWithRedirect,
        this.redirectUri
      );

      if (result.type === 'success') {
        const canisterId = this.parseCanisterIdFromUrl(result.url);

        return {
          success: true,
          canisterId,
        };
      } else if (result.type === 'cancel') {
        return {
          success: false,
          error: 'Authentication was cancelled by user',
        };
      } else {
        return {
          success: false,
          error: 'Authentication failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Parse canisterId from the redirect URL
   */
  private parseCanisterIdFromUrl(url: string): string | undefined {
    try {
      const parsedUrl = new URL(url);

      // Method 1: From query parameters
      const canisterId = parsedUrl.searchParams.get('canisterId');
      if (canisterId) return canisterId;

      // Method 2: From hash fragment (if using implicit flow)
      const hash = parsedUrl.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const canisterIdFromHash = hashParams.get('canisterId');
      if (canisterIdFromHash) return canisterIdFromHash;

      // Method 3: From path parameters
      const pathMatch = url.match(/canisterId[=/]([^&\s]+)/);
      if (pathMatch) return pathMatch[1];

      return undefined;
    } catch (error) {
      console.error('Error parsing canisterId from URL:', error);
      return undefined;
    }
  }

  /**
   * Get the redirect URI (useful for debugging)
   */
  getRedirectUri(): string {
    return this.redirectUri;
  }
}

export const authService = new AuthService();
