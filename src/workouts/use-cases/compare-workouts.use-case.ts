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
  status: 'Ótimo' | 'Ok' | 'Ruim';
  value: number;
  message: string;
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
        weekly_volume: { status: 'Ok', value: 0, message: '' },
        sleep_hours: { status: 'Ok', value: 0, message: '' },
        stress_level: { status: 'Ok', value: 0, message: '' },
        strengthening_workouts: { status: 'Ok', value: 0, message: '' },
        diet_level: { status: 'Ok', value: 0, message: '' },
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
        status: 'Ok',
        value: 0,
        message: 'Kilometragem mantido',
      };
    }

    if (current <= previous * 1.1) {
      return {
        status: 'Ótimo',
        value: current - previous,
        message: 'Kilometragem aumentou dentro do ideal!',
      };
    }

    return {
      status: 'Ruim',
      value: current - previous,
      message: 'Kilometragem aumentou fora do ideal!',
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
        status: 'Ótimo',
        value: current - previous,
        message: 'Horas de sono dentro do ideal!',
      };
    }

    if (current < previous && current < 7) {
      return {
        status: 'Ruim',
        value: current - previous,
        message: 'Horas de sono abaixo do ideal! Aumente suas horas de sono!',
      };
    }
  }

  validateStress(
    previous: number,
    current: number,
  ): WorkoutFeedbackResponse['stress_level'] {
    if (current === previous) {
      return {
        status: 'Ok',
        value: 0,
        message: 'Nível de estresse mantido, atenção!',
      };
    }

    if (current > previous) {
      return {
        status: 'Ruim',
        value: current - previous,
        message: 'Nível de estresse aumentou! Cuidado!',
      };
    }

    return {
      status: 'Ótimo',
      value: current - previous,
      message: 'Nível de estresse diminuiu! Continue assim!',
    };
  }

  validateStreengtheningWorkouts(
    previous: number,
    current: number,
  ): WorkoutFeedbackResponse['strengthening_workouts'] {
    if (current === previous) {
      return {
        status: 'Ok',
        value: 0,
        message: 'Quantidade de treinos de fortalecimento mantidos!',
      };
    }

    if (current > previous) {
      return {
        status: 'Ótimo',
        value: current - previous,
        message: 'Quantidade de treinos de fortalecimento aumentou!',
      };
    }

    return {
      status: 'Ruim',
      value: current - previous,
      message:
        'Quantidade de treinos de fortalecimento diminuiu! Foque em aumentar seus treinos!',
    };
  }

  validateDietLevel(
    current: number,
    previous: number,
  ): WorkoutFeedbackResponse['diet_level'] {
    if (current === previous || current < previous) {
      if (current === 2) {
        return {
          status: 'Ok',
          value: current,
          message:
            'Dieta mantida! Mas ainda não está ideal, melhore sua alimentação!',
        };
      }

      if (current === 1) {
        return {
          status: 'Ruim',
          value: current,
          message: 'Seu nível de dieta está péssimo, melhore sua dieta!',
        };
      }

      return {
        status: 'Ótimo',
        value: current,
        message: 'Sua dieta está ótima, continue assim!',
      };
    }

    if (current > previous) {
      if (current === 2) {
        return {
          status: 'Ok',
          value: current,
          message:
            'Dieta aumentada! Mas ainda não está ideal, melhore sua alimentação!',
        };
      }

      return {
        status: 'Ótimo',
        value: current,
        message: 'Sua dieta aumentou para o melhor nível! Continue assim!',
      };
    }
  }
}
