
export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;
  userId: string;
}

export interface SaveAppointmentDTO {
  title: string;
  description: string;
  date: string;
}

export interface AppointmentLocal {
  id: string;             
  title: string;
  description: string;
  date: string;
  userId: string;
  syncState: 'synced' | 'pending_insert' | 'pending_update' | 'pending_delete'; 
}