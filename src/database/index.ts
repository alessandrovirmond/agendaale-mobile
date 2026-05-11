import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schema } from '../models/schema';
import Appointment from '../models/Appointment';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true, 
  onSetUpError: error => {
    console.error("Falha ao inicializar o banco de dados offline:", error);
  }
});

export const database = new Database({
  adapter,
  modelClasses: [
    Appointment,
  ],
});