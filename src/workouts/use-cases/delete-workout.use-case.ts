import { Inject } from '@nestjs/common';
import { IWorkoutRepository } from '../repositories/IWorkoutRepository';

export class DeleteWorkoutUseCase {
  constructor(
    @Inject('IWorkoutRepository')
    private readonly workoutRepo: IWorkoutRepository,
  ) {}

  async execute(id: string) {
    const workoutExists = await this.workoutRepo.findById(id);

    if (!workoutExists) {
      throw new Error('Workout not found');
    }

    const workout = await this.workoutRepo.delete(id);

    console.log(workout);

    return workout;
  }
}
