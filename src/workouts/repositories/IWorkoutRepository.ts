import { Workout } from '../entities/workout.entity';
import { WorkoutFeedback } from '../use-cases/compare-workouts.use-case';

export interface IWorkoutRepository {
  create(data: Workout): Promise<void>;
  getWorkoutBetweenDates(
    startDate: Date,
    endDate: Date,
    user_id: string,
  ): Promise<Workout[]>;
  getAllUserWorkouts(user_id: string): Promise<Workout[]>;
  getLastTwoOnes(user_id: string): Promise<WorkoutFeedback[]>;
  findById(id: string): Promise<Workout>;
  update(data: Workout): Promise<Workout | null>;
  delete(id: string): Promise<number | null>;
}
