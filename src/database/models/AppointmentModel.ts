import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export class AppointmentModel extends Model {
  static table = 'appointments';

  @text('title') title!: string;
  @text('description') description!: string;
  @text('date') date!: string;
  @text('user_id') userId!: string;
    @text('sync_state') syncState!: string; 
}