import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum UserFitnessLevel {
  ROOKIE = 'rookie',
  INTERMEDIARY = 'intermediary',
  ADVANCED = 'advanced',
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserGender,
  })
  gender: UserGender;

  @Column()
  birth_date: Date;

  @Column()
  diseases: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column({
    type: 'enum',
    enum: UserFitnessLevel,
    default: UserFitnessLevel.ROOKIE,
  })
  fitness_level: UserFitnessLevel;

  @Column()
  isOnBalancedDiet: boolean;

  @Column()
  isAdmin: boolean;

  constructor(
    props: {
      name: string;
      email: string;
      password_hash: string;
      gender: UserGender;
      birth_date: Date;
      diseases: string;
      weight: number;
      height: number;
      fitness_level?: UserFitnessLevel;
      isAdmin: boolean;
      isOnBalancedDiet: boolean;
    },
    id?: string,
  ) {
    Object.assign(this, props), (this.id = id ?? randomUUID());
  }
}
