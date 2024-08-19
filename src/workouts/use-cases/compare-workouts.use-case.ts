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

export type ItemsFeedback = {
  status: 'Bom' | 'Médio' | 'Ruim';
  value: number;
};

export type WorkoutFeedbackResponse = {
  stress_level: ItemsFeedback;
  weekly_volume: ItemsFeedback;
  sleep_hours: ItemsFeedback;
  strengthening_workouts: ItemsFeedback;
  diet_level: ItemsFeedback;
};

export class CompareWorkoutsUseCase {
  constructor(
    @Inject('IWorkoutRepository')
    private readonly workoutRepo: IWorkoutRepository,
  ) {}

  async execute(user_id: string): Promise<WorkoutFeedbackResponse> {
    const lastTwoWorkouts: WorkoutFeedback[] =
      await this.workoutRepo.getLastTwoOnes(user_id);

    if (!lastTwoWorkouts || lastTwoWorkouts.length < 2) {
      return {
        weekly_volume: { status: 'Médio', value: 0 },
        sleep_hours: { status: 'Médio', value: 0 },
        stress_level: { status: 'Médio', value: 0 },
        strengthening_workouts: { status: 'Médio', value: 0 },
        diet_level: { status: 'Médio', value: 0 },
      };
    }

    const [currentWorkout, prevWorkout] = lastTwoWorkouts;

    const result: WorkoutFeedbackResponse = {
      weekly_volume: this.validateWeeklyVolume(
        currentWorkout.weekly_volume,
        prevWorkout.weekly_volume,
      ),
      sleep_hours: this.validateSleepHours(
        prevWorkout.sleep_hours,
        currentWorkout.sleep_hours,
      ),
      stress_level: this.validateStress(
        prevWorkout.stress_level,
        currentWorkout.stress_level,
      ),
      strengthening_workouts: this.validateStreengtheningWorkouts(
        prevWorkout.strengthening_workouts,
        currentWorkout.strengthening_workouts,
      ),
      diet_level: this.validateDietLevel(
        currentWorkout.diet_level,
        prevWorkout.diet_level,
      ),
    };

    console.log(result);
    return result;
  }

  validateWeeklyVolume(
    current: number,
    previous: number,
  ): WorkoutFeedbackResponse['weekly_volume'] {
    if (current === previous) {
      return {
        status: 'Médio',
        value: 0,
      };
    }

    if (current <= previous * 1.1) {
      return {
        status: 'Bom',
        value: current - previous,
      };
    }

    return {
      status: 'Ruim',
      value: current - previous,
    };
  }

  validateSleepHours(
    previous: number,
    current: number,
  ): WorkoutFeedbackResponse['sleep_hours'] {
    console.log(previous, current);
    if (
      (current === previous && current >= 7) ||
      (current > previous && current >= 7) ||
      (current < previous && current >= 7)
    ) {
      return {
        status: 'Bom',
        value: current - previous,
      };
    }

    if (current < previous && current < 7) {
      return {
        status: 'Ruim',
        value: current - previous,
      };
    }
  }

  validateStress(
    previous: number,
    current: number,
  ): WorkoutFeedbackResponse['stress_level'] {
    if (current === previous) {
      return {
        status: 'Médio',
        value: 0,
      };
    }

    if (current > previous) {
      return {
        status: 'Ruim',
        value: current - previous,
      };
    }

    return {
      status: 'Bom',
      value: current - previous,
    };
  }

  validateStreengtheningWorkouts(
    previous: number,
    current: number,
  ): WorkoutFeedbackResponse['strengthening_workouts'] {
    if (current === previous) {
      return {
        status: 'Médio',
        value: 0,
      };
    }

    if (current > previous) {
      return {
        status: 'Bom',
        value: current - previous,
      };
    }

    return {
      status: 'Ruim',
      value: current - previous,
    };
  }

  validateDietLevel(
    current: number,
    previous: number,
  ): WorkoutFeedbackResponse['diet_level'] {
    if (current === previous || current < previous) {
      if (current === 2) {
        return {
          status: 'Médio',
          value: current,
        };
      }

      if (current === 1) {
        return {
          status: 'Ruim',
          value: current,
        };
      }

      return {
        status: 'Bom',
        value: current,
      };
    }

    if (current > previous) {
      if (current === 2) {
        return {
          status: 'Médio',
          value: current,
        };
      }

      return {
        status: 'Bom',
        value: current,
      };
    }
  }
}
