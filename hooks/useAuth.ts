import { useState, useCallback } from 'react';

import { authService, AuthResult } from '../services/authService';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);

  const authenticate = useCallback(async () => {
    setIsLoading(true);
    setResult(null);

    try {
      let authResult: AuthResult;

      authResult = await authService.authenticateWithWebBrowser();

      setResult(authResult);
      return authResult;
    } catch (error) {
      const errorResult: AuthResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  return {
    authenticate,
    isLoading,
    result,
    reset,
  };
}
