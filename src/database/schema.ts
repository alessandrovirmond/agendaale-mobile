import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1, 
  tables: [
    tableSchema({
      name: 'appointments',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'date', type: 'string' },
        { name: 'user_id', type: 'string' },
        { name: 'sync_state', type: 'string' }, 
      ]
    }),
  ]
});