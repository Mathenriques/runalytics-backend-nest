import { Inject } from '@nestjs/common';
import { IWorkoutRepository } from '../repositories/IWorkoutRepository';
import { Workout } from '../entities/workout.entity';
import { UpdateWorkoutDto } from '../dtos/update-workout.dto';

export class UpdateWorkoutUseCase {
  constructor(
    @Inject('IWorkoutRepository')
    private readonly workoutRepo: IWorkoutRepository,
  ) {}

  async execute(data: UpdateWorkoutDto): Promise<Workout> {
    const workoutExists = await this.workoutRepo.findById(data.id);

    if (!workoutExists) {
      throw new Error('Workout not found');
    }

    return await this.workoutRepo.update(data);
  }
}
