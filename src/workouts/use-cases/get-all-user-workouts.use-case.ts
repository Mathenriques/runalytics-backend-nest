import { Inject } from '@nestjs/common';
import { IWorkoutRepository } from '../repositories/IWorkoutRepository';
import { Workout } from '../entities/workout.entity';

export class GetAllUserWorkouts {
  constructor(
    @Inject('IWorkoutRepository')
    private readonly workoutRepo: IWorkoutRepository,
  ) {}

  async execute(user_id: string): Promise<Workout[]> {
    return await this.workoutRepo.getAllUserWorkouts(user_id);
  }
}
