import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthService } from '../src/services/AuthService';
import { useAuthStore } from '../src/store/useAuthStore';

export default function RootLayout() {
  const [isHydrating, setIsHydrating] = useState(true);
  const { token } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    setIsHydrating(false);
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

  if (isHydrating) return <ActivityIndicator />;

  return <Slot />;
}