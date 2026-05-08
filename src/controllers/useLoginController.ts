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
      // 1. Abre o modal do Google no celular
      const googleToken = await AuthService.signInWithGoogle();
      
      // 2. Envia para o nosso .NET e pega o JWT de volta
      const apiJwtToken = await AuthService.authenticateWithApi(googleToken);
      
      // 3. Guarda no cofre do aparelho
      await AuthService.saveTokenSecurely(apiJwtToken);
      
      // 4. Salva no estado global para o app liberar as rotas protegidas
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