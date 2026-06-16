// src/components/AppointmentCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appointment } from '../types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

export function AppointmentCard({ appointment, onEdit, onDelete }: AppointmentCardProps) {
  const formattedDate = new Date(appointment.date).toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{appointment.title}</Text>
        <Text style={styles.cardDate}>{formattedDate}</Text>
      </View>
      {appointment.description ? (
        <Text style={styles.cardDescription}>{appointment.description}</Text>
      ) : null}
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(appointment)}>
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onDelete(appointment.id)}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1C1C1E', flex: 1 },
  cardDate: { fontSize: 14, color: '#8E8E93' },
  cardDescription: { fontSize: 15, color: '#3A3A3C', marginBottom: 12 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderColor: '#F2F2F7', paddingTop: 12 },
  actionBtn: { marginLeft: 20 },
  editText: { color: '#007AFF', fontWeight: '500' },
  deleteText: { color: '#FF3B30', fontWeight: '500' },
});