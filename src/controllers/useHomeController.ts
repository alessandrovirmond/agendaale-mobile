import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Q } from '@nozbe/watermelondb';
import { database } from '../database';
import { AppointmentModel } from '../database/models/AppointmentModel';
import { Appointment, SaveAppointmentDTO } from '../types/appointment';

export function useHomeController() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);

  // 1. CARREGAR DO BANCO LOCAL (Muito mais rápido que a API)
  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const collection = database.get<AppointmentModel>('appointments');
      
      // Busca todas as tarefas locais que não foram deletadas
      const records = await collection.query(
        Q.where('sync_state', Q.notEq('pending_delete'))
      ).fetch();

      // Mapeia o modelo nativo para a interface que a tela já conhece
      const mapped: Appointment[] = records.map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        date: r.date,
        userId: r.userId,
        syncState: r.syncState // Adicione esse campo na sua interface Appointment no types/appointment.ts
      }));

      setAppointments(mapped);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao ler banco de dados local.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // ... (openModal e closeModal continuam iguais)
  const openModal = (appointment?: Appointment) => {
    setAppointmentToEdit(appointment || null);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setAppointmentToEdit(null);
  };

  // 2. SALVAR NO BANCO LOCAL (Operação Instantânea)
  const handleSave = async (data: SaveAppointmentDTO) => {
    try {
      const collection = database.get<AppointmentModel>('appointments');

      // Toda alteração no Watermelon precisa estar dentro de um database.write()
      await database.write(async () => {
        if (appointmentToEdit) {
          // Atualiza registro existente
          const record = await collection.find(appointmentToEdit.id);
          await record.update(r => {
            r.title = data.title;
            r.description = data.description;
            // Se já estava sincronizado, agora fica pendente de update
            if (r.syncState === 'synced') r.syncState = 'pending_update';
          });
        } else {
          // Cria novo registro
          await collection.create(r => {
            r.title = data.title;
            r.description = data.description;
            r.date = data.date;
            r.userId = 'me'; // Futuramente pegaremos do JWT
            r.syncState = 'pending_insert'; // Marca que precisa ir para a API
          });
        }
      });

      closeModal();
      loadAppointments(); 
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar no celular.');
    }
  };

  // 3. DELETAR (Exclusão Lógica)
  const handleDelete = (id: string) => {
    Alert.alert('Excluir Tarefa', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          try {
            await database.write(async () => {
              const record = await database.get<AppointmentModel>('appointments').find(id);
              
              if (record.syncState === 'pending_insert') {
                await record.destroyPermanently();
              } else {
                await record.update(r => { r.syncState = 'pending_delete'; });
              }
            });
            loadAppointments();
          } catch (error) {
            Alert.alert('Erro', 'Falha ao excluir.');
          }
        }
      }
    ]);
  };

  return {
    appointments, isLoading, modalVisible, appointmentToEdit,
    openModal, closeModal, handleSave, handleDelete, loadAppointments
  };
}