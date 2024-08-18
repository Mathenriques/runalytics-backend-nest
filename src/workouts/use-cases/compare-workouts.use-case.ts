import { Inject } from '@nestjs/common';
import { IWorkoutRepository } from '../repositories/IWorkoutRepository';
import { Workout } from '../entities/workout.entity';

export type WorkoutFeedback = Omit<
  Workout,
  | 'id'
  | 'start_date'
  | 'end_date'
  | 'pain_discomfort'
  | 'deletedDate'
  | 'user_id'
  | 'didMyofascialRelease'
>;
export type WorkoutItems = {
  status: 'Bom' | 'Médio' | 'Ruim';
  value: number;
};
export class CompareWorkoutsUseCase {
  constructor(
    @Inject('IWorkoutRepository')
    private readonly workoutRepo: IWorkoutRepository,
  ) {}

  async execute(user_id: string): Promise<Workout | WorkoutFeedback> {
    const allWorkouts: Workout[] =
      await this.workoutRepo.getAllUserWorkouts(user_id);

    if (allWorkouts.length <= 1) {
      return allWorkouts[0];
    }

    const lastTwoWorkouts: Workout[] =
      allWorkouts.length >= 2
        ? [
            allWorkouts[allWorkouts.length - 2],
            allWorkouts[allWorkouts.length - 1],
          ]
        : allWorkouts;

    const [prevWorkout, currentWorkout] = lastTwoWorkouts;

    const result: WorkoutFeedback = {
      weekly_volume: currentWorkout.weekly_volume - prevWorkout.weekly_volume,
      strengthening_workouts:
        currentWorkout.strengthening_workouts -
        prevWorkout.strengthening_workouts,
      diet_level: currentWorkout.diet_level - prevWorkout.diet_level,
      stress_level: currentWorkout.stress_level - prevWorkout.stress_level,
      sleep_hours: currentWorkout.sleep_hours - prevWorkout.sleep_hours,
    };

    return result;
  }
}
