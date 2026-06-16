// app/(app)/home.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import { AuthService } from '../../src/services/AuthService';
import { AppointmentCard } from '../../src/components/AppointmentCard';
import { AppointmentModal } from '../../src/components/AppointmentModal';
import { useHomeController } from '../../src/controllers/useHomeController';
import { colors } from '../../src/theme/colors';
import { SyncService } from '../../src/services/SyncService';

export default function HomeScreen() {
  const { logout } = useAuthStore();

  const controller = useHomeController();

  const handleLogout = async () => {
    await AuthService.removeToken();
    logout();
  };

  const handleSync = async () => {
    try {
      const count = await SyncService.syncPendingInserts();
      Alert.alert('Sync Concluído', `${count} tarefas enviadas para a nuvem!`);
      controller.loadAppointments();
    } catch (e) {
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Minhas Tarefas</Text>
        <TouchableOpacity onPress={handleSync} style={{ marginRight: 15 }}>
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Sincronizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {controller.isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={controller.appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              onEdit={controller.openModal}
              onDelete={controller.handleDelete}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>Sua agenda está vazia.</Text>}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => controller.openModal()}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AppointmentModal
        visible={controller.modalVisible}
        appointmentToEdit={controller.appointmentToEdit}
        onClose={controller.closeModal}
        onSave={controller.handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background || '#F2F2F7' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#E5E5EA' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1C1C1E' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '600' },
  listContainer: { padding: 20, paddingBottom: 100 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#8E8E93', fontSize: 16 },
  fab: { position: 'absolute', right: 20, bottom: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  fabText: { fontSize: 32, color: '#FFF', fontWeight: '300', marginTop: -4 },
});