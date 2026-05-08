import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export function DeveloperLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Alessandro Virmond</Text>
      <Text style={styles.title}>FULL STACK DEVELOPER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    letterSpacing: 2,
    marginTop: 4,
  },
});