import { Workout } from '../entities/workout.entity';

export interface IWorkoutRepository {
  create(data: Workout): Promise<void>;
  getWorkoutBetweenDates(
    startDate: Date,
    endDate: Date,
    user_id: string,
  ): Promise<Workout[]>;
  getAllUserWorkouts(user_id: string): Promise<Workout[]>;
  findById(id: string): Promise<Workout>;
  update(data: Workout): Promise<Workout | null>;
  delete(id: string): Promise<number | null>;
}
