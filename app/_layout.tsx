import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { database } from '../src/database';

const WatermelonProvider = DatabaseProvider as any;

export default function RootLayout() {
  return (
    <WatermelonProvider database={database}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
      </Stack>
    </WatermelonProvider>
  );
}