import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Appointment extends Model {
  static table = 'appointments';

  @text('title') title!: string;
  @text('description') description?: string;
  @date('date') date!: Date;
  @field('is_synced') isSynced!: boolean;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;


  get isOverdue(): boolean {
    return this.date.getTime() < new Date().getTime() && !this.isSynced;
  }

  async markAsSynced() {
    await this.update(appointment => {
      appointment.isSynced = true;
    });
  }
}