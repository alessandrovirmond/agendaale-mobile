import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { AuthService } from '../services/AuthService';
import { useAuthStore } from '../store/useAuthStore';

export function useLoginController() {
  const [isLoading, setIsLoading] = useState(false);
  const setStoreToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    AuthService.configureGoogleSignIn();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const googleToken = await AuthService.signInWithGoogle();
      
      const apiJwtToken = await AuthService.authenticateWithApi(googleToken);
      
      await AuthService.saveTokenSecurely(apiJwtToken);
      
      setStoreToken(apiJwtToken);

    } catch (error: any) {
      console.error(error);
      Alert.alert('Ops!', error.message || 'Não foi possível realizar o login.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading
  };
}