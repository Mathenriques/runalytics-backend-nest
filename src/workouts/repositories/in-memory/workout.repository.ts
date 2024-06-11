import { Workout } from 'src/workouts/entities/workout.entity';
import { IWorkoutRepository } from '../IWorkoutRepository';

export class WorkoutInMemoryRepository implements IWorkoutRepository {
  public items: Workout[] = [];

  async create(workout: Workout): Promise<void> {
    this.items.push(workout);
  }

  async getWorkoutBetweenDates(
    start_date: Date,
    end_date: Date,
    user_id: string,
  ): Promise<Workout[]> {
    const workout = this.items.filter(
      (item) =>
        item.user_id === user_id &&
        ((item.start_date <= end_date && item.end_date >= start_date) || // Intervalo se sobrepõe
          (item.start_date >= start_date && item.end_date <= end_date)), // Intervalo está completamente dentro
    );

    return workout;
  }

  async getAllUserWorkouts(user_id: string): Promise<Workout[]> {
    return this.items.filter((item) => item.user_id === user_id);
  }
}
