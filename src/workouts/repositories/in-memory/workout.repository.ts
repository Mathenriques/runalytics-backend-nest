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
    return this.items.filter(
      (item) => item.user_id === user_id && item.deletedDate === undefined,
    );
  }

  async update(data: Workout): Promise<Workout> {
    const index = this.items.findIndex((item) => item.id === data.id);

    this.items[index] = data;

    return data;
  }

  async findById(id: string): Promise<Workout | null> {
    return this.items.find((item) => item.id === id);
  }

  async delete(id: string): Promise<number | null> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.items[index].deletedDate = new Date();

      return 1;
    }

    return null;
  }
}
