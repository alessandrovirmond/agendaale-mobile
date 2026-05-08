import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { DeveloperLogo } from '../components/DeveloperLogo';
import { useLoginController } from '../controllers/useLoginController';
import { colors } from '../theme/colors';

export function LoginScreen() {
  const { handleLogin, isLoading } = useLoginController();

  return (
    <View style={styles.container}>
      
      <DeveloperLogo />

      <View style={styles.card}>
        <Text style={styles.heading}>AgendaAle</Text>
        <Text style={styles.subheading}>Sincronize sua rotina e mantenha tudo sob controle.</Text>

        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={handleLogin}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text style={styles.googleButtonText}>Entrar com o Google</Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  googleButton: {
    backgroundColor: colors.google,
    width: '100%',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  googleButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});