import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthService } from '../src/services/AuthService'; // Ajuste o path se necessário
import { useAuthStore } from '../src/store/useAuthStore'; // Ajuste o path se necessário
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  const [isHydrating, setIsHydrating] = useState(true);
  const { setToken, token } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();


  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const savedToken = await AuthService.getStoredToken();
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.error('Erro ao hidratar token:', error);
      } finally {
        setIsHydrating(false); 
      }
    };
 
    hydrateAuth();
  }, []);


  useEffect(() => {
    if (isHydrating) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (token && inAuthGroup) {
      router.replace('/(app)/home');
    }
  }, [token, isHydrating, segments]);

  if (isHydrating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary || '#000'} />
      </View>
    );
  }

  return <Slot />;
}