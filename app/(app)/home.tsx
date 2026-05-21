import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import { AuthService } from '../../src/services/AuthService';
import { colors } from '../../src/theme/colors';

export default function HomeScreen() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await AuthService.removeToken(); 
    logout(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Minha Agenda</Text>
      <Text style={styles.subheading}>
        Bem-vindo! Você está autenticado e pronto para organizar sua rotina.
      </Text>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  logoutButton: {
    backgroundColor: '#FF3B30', 
    paddingHorizontal: 32,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});