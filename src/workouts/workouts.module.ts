import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutController } from './workouts.controller';
import { CreateWorkoutUseCase } from './use-cases/create-workout.use-case';
import { DeleteWorkoutUseCase } from './use-cases/delete-workout.use-case';
import { GetAllUserWorkouts } from './use-cases/get-all-user-workouts.use-case';
import { UpdateWorkoutUseCase } from './use-cases/update-workout.use-case';
import { GetUserProfileUseCase } from 'src/users/use-cases/get-user-profile.use-case';
import { Workout } from './entities/workout.entity';
import { WorkoutTypeORMRepository } from './repositories/typeorm/workout.repository';
import { UserTypeOrmRepository } from 'src/users/repositories/typeorm/user.repository';
import { User } from 'src/users/entities/user.entity';
import { CompareWorkoutsUseCase } from './use-cases/compare-workouts.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, User])],
  providers: [
    CreateWorkoutUseCase,
    DeleteWorkoutUseCase,
    GetAllUserWorkouts,
    UpdateWorkoutUseCase,
    GetUserProfileUseCase,
    CompareWorkoutsUseCase,
    WorkoutTypeORMRepository,
    UserTypeOrmRepository,
    {
      provide: 'IWorkoutRepository',
      useExisting: WorkoutTypeORMRepository,
    },
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
  controllers: [WorkoutController],
  exports: [],
})
export class WorkoutModule {}
