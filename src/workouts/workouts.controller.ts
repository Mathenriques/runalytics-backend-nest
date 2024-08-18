import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWorkoutUseCase } from './use-cases/create-workout.use-case';
import { DeleteWorkoutUseCase } from './use-cases/delete-workout.use-case';
import { GetAllUserWorkouts } from './use-cases/get-all-user-workouts.use-case';
import { UpdateWorkoutUseCase } from './use-cases/update-workout.use-case';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { GetUserProfileUseCase } from 'src/users/use-cases/get-user-profile.use-case';
import { UpdateWorkoutDto } from './dtos/update-workout.dto';
import { CompareWorkoutsUseCase } from './use-cases/compare-workouts.use-case';

@Controller('workouts')
export class WorkoutController {
  @Inject(CreateWorkoutUseCase)
  private readonly createWorkoutUseCase: CreateWorkoutUseCase;

  @Inject(GetAllUserWorkouts)
  private readonly getAllUserWorkouts: GetAllUserWorkouts;

  @Inject(GetUserProfileUseCase)
  private readonly getUserProfileUseCase: GetUserProfileUseCase;

  @Inject(DeleteWorkoutUseCase)
  private readonly deleteWorkoutUseCase: DeleteWorkoutUseCase;

  @Inject(UpdateWorkoutUseCase)
  private readonly updateWorkoutUseCase: UpdateWorkoutUseCase;

  @Inject(CompareWorkoutsUseCase)
  private readonly compareWorkoutsUseCase: CompareWorkoutsUseCase;

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.createWorkoutUseCase.execute(createWorkoutDto);
  }

  @Get(':user_id')
  async getUserWorkout(@Param('user_id') id: string) {
    this.getUserProfileUseCase.execute(id);

    const [workouts, compareWorkouts] = await Promise.all([
      this.getAllUserWorkouts.execute(id),
      this.compareWorkoutsUseCase.execute(id),
    ]);

    return { workouts, compareWorkouts };
  }

  @Put()
  update(@Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.updateWorkoutUseCase.execute(updateWorkoutDto);
  }

  @Delete(':id')
  removeWOrkout(@Param('id') id: string) {
    return this.deleteWorkoutUseCase.execute(id);
  }
}
