import { Q } from '@nozbe/watermelondb';
import { database } from '../database';
import { AppointmentModel } from '../database/models/AppointmentModel';
import { AppointmentService } from './AppointmentService'; // A sua API antiga

export const SyncService = {
  syncPendingInserts: async () => {
    const collection = database.get<AppointmentModel>('appointments');
    
    // Pega tudo que o usuário criou offline
    const pendingInserts = await collection.query(
      Q.where('sync_state', 'pending_insert')
    ).fetch();

    if (pendingInserts.length === 0) return 0; // Nada para sincronizar

    let successCount = 0;

    for (const record of pendingInserts) {
      try {
        // Tenta enviar para a API C#
        await AppointmentService.create({
          title: record.title,
          description: record.description,
          date: record.date
        });

        // Se a API retornou 200 OK, atualizamos o status local para "synced"
        await database.write(async () => {
          await record.update(r => {
            r.syncState = 'synced';
          });
        });

        successCount++;
      } catch (error) {
        console.log(`Falha ao sincronizar a tarefa ${record.title}. Ela tentará novamente depois.`);
        // Ignora o erro e deixa o loop continuar. A tarefa continua como "pending_insert".
      }
    }

    return successCount;
  }
};