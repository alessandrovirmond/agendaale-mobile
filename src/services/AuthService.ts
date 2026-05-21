import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'agendaale_jwt';

export const AuthService = {
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '523674610292-7q9qaltbhrdrr58h0hdn134s26r36t10.apps.googleusercontent.com', 
    });
  },

async signInWithGoogle(): Promise<User['user']> {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    
    if (response.type === 'success' && response.data.user) {
      return response.data.user;
    } else {
      throw new Error('Login cancelado ou mal sucedido.');
    }
  },

async authenticateWithApi(googleUser: User['user']): Promise<string> {
    const payload = {
      externalAuthId: googleUser.id,
      email: googleUser.email,
      name: googleUser.name
    };

    const response = await fetch('https://agendaale-api-1.onrender.com/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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