import { randomUUID } from 'crypto';
import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('workouts')
export class Workout {
  @PrimaryColumn()
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  weekly_volume: number;

  @Column()
  strengthening_workouts: number;

  @Column()
  stress_level: number;

  @Column()
  sleep_hours: number;

  @Column()
  didMyofascialRelease: boolean;

  @Column()
  pain_discomfort: string;

  @DeleteDateColumn()
  deletedDate?: Date;

  @Column()
  user_id: string;

  constructor(
    props: {
      start_date: Date;
      end_date: Date;
      weekly_volume: number;
      strengthening_workouts: number;
      stress_level: number;
      sleep_hours: number;
      didMyofascialRelease: boolean;
      pain_discomfort: string;
      deletedDate?: Date;
      user_id: string;
    },
    id?: string,
  ) {
    Object.assign(this, props), (this.id = id ?? randomUUID());
  }
}
