// src/services/AppointmentService.ts
import { useAuthStore } from '../store/useAuthStore';

// Tipagem baseada na sua entidade C#
export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  userId: string;
}

export interface SaveAppointmentDTO {
  title: string;
  description: string;
  date: string;
}

const API_URL = 'https://agendaale-api-1.onrender.com/api/Appointment';

const getHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const AppointmentService = {
  getMyAppointments: async (): Promise<Appointment[]> => {
    const response = await fetch(`${API_URL}/my-appointments`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return await response.json();
  },

  create: async (data: SaveAppointmentDTO): Promise<string> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return await response.text(); 
  },

  update: async (id: string, data: SaveAppointmentDTO): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Erro ao excluir tarefa');
  }
};