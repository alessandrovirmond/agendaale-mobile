import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = '@agendaale_jwt';

export const AuthService = {
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: 'AIzaSyC7sv28Wy0olSwOpnYrjcMApK-1QPZL-Fo.apps.googleusercontent.com', 
    });
  },

async signInWithGoogle(): Promise<string> {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    
    if (response.type === 'success') {
      if (!response.data.idToken) {
        throw new Error('Token do Google não retornado.');
      }
      return response.data.idToken;
    } else {
      throw new Error('Login cancelado ou mal sucedido.');
    }
  },

  async authenticateWithApi(googleIdToken: string): Promise<string> {
    const response = await fetch('http://192.168.X.X:5260/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleIdToken }),
    });

    if (!response.ok) {
      throw new Error('Falha ao autenticar com a API da AgendaAle.');
    }

    const data = await response.json();
    return data.jwtToken; 
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