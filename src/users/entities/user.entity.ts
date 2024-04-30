import { randomUUID } from 'crypto';
import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum UserFitnessLevel {
  ROOKIE = 'rookie',
  INTERMEDIARY = 'intermediary',
  ADVANCED = 'advanced',
}

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserGender,
  })
  gender: UserGender;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ nullable: true })
  diseases: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column({
    type: 'enum',
    enum: UserFitnessLevel,
    nullable: true,
  })
  fitness_level: UserFitnessLevel;

  @Column({ nullable: true })
  isOnBalancedDiet: boolean;

  @Column()
  isAdmin: boolean;

  @DeleteDateColumn()
  deletedDate: Date;

  constructor(
    props: {
      name: string;
      email: string;
      password_hash: string;
      gender: UserGender;
      birth_date: Date;
      diseases?: string;
      weight?: number;
      height?: number;
      fitness_level?: UserFitnessLevel;
      isOnBalancedDiet?: boolean;
      isAdmin: boolean;
      deletedDate?: Date;
    },
    id?: string,
  ) {
    Object.assign(this, props), (this.id = id ?? randomUUID());
  }
}
