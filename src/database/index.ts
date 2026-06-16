import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schema } from './schema';
import { AppointmentModel } from './models/AppointmentModel';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true, // Habilita a comunicação ultrarrápida (C++ direto para JS)
  onSetUpError: error => {
    console.error("Falha ao configurar o banco de dados WatermelonDB:", error);
  }
});

// Nossa instância global do banco de dados
export const database = new Database({
  adapter,
  modelClasses: [
    AppointmentModel,
  ],
});