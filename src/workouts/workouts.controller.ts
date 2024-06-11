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

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.createWorkoutUseCase.execute(createWorkoutDto);
  }

  @Get(':user_id')
  getUserWorkout(@Param('user_id') id: string) {
    this.getUserProfileUseCase.execute(id);

    return this.getAllUserWorkouts.execute(id);
  }

  @Put()
  update(@Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.updateWorkoutUseCase.execute(updateWorkoutDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.deleteWorkoutUseCase.execute(id);
  }
}
