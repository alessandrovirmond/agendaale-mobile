// src/components/AppointmentModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Appointment, SaveAppointmentDTO } from '../types/appointment';

interface AppointmentModalProps {
  visible: boolean;
  appointmentToEdit: Appointment | null;
  onClose: () => void;
  onSave: (data: SaveAppointmentDTO) => void;
}

export function AppointmentModal({ visible, appointmentToEdit, onClose, onSave }: AppointmentModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Sempre que o modal abrir ou mudar a tarefa, atualizamos os campos
  useEffect(() => {
    if (appointmentToEdit) {
      setTitle(appointmentToEdit.title);
      setDescription(appointmentToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [appointmentToEdit, visible]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Aviso', 'O título é obrigatório.');
      return;
    }
    
    onSave({
      title,
      description,
      date: appointmentToEdit ? appointmentToEdit.date : new Date().toISOString()
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{appointmentToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  content: { backgroundColor: '#FFF', borderRadius: 16, padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1C1C1E' },
  input: { borderWidth: 1, borderColor: '#D1D1D6', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12, backgroundColor: '#FAFAFA' },
  textArea: { height: 80, textAlignVertical: 'top' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  cancelBtn: { padding: 12, marginRight: 8 },
  cancelText: { color: '#8E8E93', fontSize: 16, fontWeight: '500' },
  saveBtn: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  saveText: { color: '#FFF', fontSize: 16, fontWeight: '600' }
});