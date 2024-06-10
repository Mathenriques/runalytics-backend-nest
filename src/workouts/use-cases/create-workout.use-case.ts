import { Inject } from '@nestjs/common';
import { CreateWorkoutDto } from '../dtos/create-workout.dto';
import { IWorkoutRepository } from '../repositories/IWorkoutRepository';
import { Workout } from '../entities/workout.entity';

export class CreateWorkoutUseCase {
  constructor(
    @Inject('IWorkoutRepository')
    private readonly workoutRepo: IWorkoutRepository,
  ) {}

  async execute(input: CreateWorkoutDto) {
    const { user_id, start_date, end_date } = input;

    const workoutExists = this.workoutRepo.getWorkoutBetweenDates(
      start_date,
      end_date,
      user_id,
    );

    if (workoutExists) {
      throw new Error('Already exists an workout between these dates');
    }

    const workout = new Workout(input);

    await this.workoutRepo.create(workout);

    return {
      workout,
    };
  }
}
