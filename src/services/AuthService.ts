import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'agendaale_jwt';

export const AuthService = {
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '523674610292-7q9qaltbhrdrr58h0hdn134s26r36t10.apps.googleusercontent.com',
    });
  },

  async signInWithGoogle(): Promise<any> {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      // Retornamos o data inteiro em vez de apenas response.data.user
      if (response.type === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error('Login cancelado ou mal sucedido.');
      }
    } catch (error: any) {
      console.log('🚨 ERRO CRU DO GOOGLE:', JSON.stringify(error, null, 2));
      throw new Error('Login cancelado ou mal sucedido.');
    }
  },

  async authenticateWithApi(googleData: any): Promise<string> {
    const payload = {
      GoogleToken: googleData.idToken,
      externalAuthId: googleData.user.id,
      email: googleData.user.email,
      name: googleData.user.name,
    };

    try {
      const response = await fetch('https://agendaale-api-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.log('🚨 STATUS HTTP:', response.status);
        console.log('🚨 RESPOSTA DO BACKEND:', errorData);

        throw new Error('Credenciais rejeitadas pela API.');
      }

      const data = await response.json();
      console.log("DADOS QUE VIERAM DA API:", data);

      return data.token;

    } catch (error: any) {
      console.log('🚨 ERRO CRU:', error.message);
      throw new Error('Falha ao autenticar com a API da AgendaAle.');
    }
  },

  async saveTokenSecurely(jwtToken: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, jwtToken);
  },

  async getStoredToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await GoogleSignin.signOut();
  }
};