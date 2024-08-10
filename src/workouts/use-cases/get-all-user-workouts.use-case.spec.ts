import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserWorkouts } from './get-all-user-workouts.use-case';
import { WorkoutInMemoryRepository } from '../repositories/in-memory/workout.repository';
import { CreateWorkoutUseCase } from './create-workout.use-case';

describe('Get All User Workouts Use Case Test', () => {
  let useCase: GetAllUserWorkouts;
  let createWorkoutUseCase: CreateWorkoutUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUserWorkouts,
        CreateWorkoutUseCase,
        WorkoutInMemoryRepository,
        {
          provide: 'IWorkoutRepository',
          useExisting: WorkoutInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetAllUserWorkouts>(GetAllUserWorkouts);
    createWorkoutUseCase =
      module.get<CreateWorkoutUseCase>(CreateWorkoutUseCase);
  });

  it('Should be able to get all user workouts', async () => {
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const day = i + 1;
      const workoutData = {
        start_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        end_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        weekly_volume: 50,
        strengthening_workouts: 3,
        stress_level: 5,
        sleep_hours: 8,
        diet_level: 1,
        pain_discomfort: '',
        didMyofascialRelease: true,
        user_id: 'XXX',
      };

      await createWorkoutUseCase.execute(workoutData);
    }

    const workouts = await useCase.execute('XXX');
    expect(workouts.length).toEqual(10);
  });

  it('Should be able to get only workouts that are deleted', async () => {
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const day = i + 1;
      const workoutData = {
        start_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        end_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        weekly_volume: 50,
        strengthening_workouts: 3,
        stress_level: 5,
        sleep_hours: 8,
        diet_level: 1,
        pain_discomfort: '',
        didMyofascialRelease: true,
        user_id: 'XXX',
      };

      await createWorkoutUseCase.execute(workoutData);
    }

    const workoutData = {
      start_date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      end_date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      diet_level: 1,
      pain_discomfort: '',
      didMyofascialRelease: true,
      deletedDate: new Date(),
      user_id: 'XXX',
    };

    await createWorkoutUseCase.execute(workoutData);

    const workouts = await useCase.execute('XXX');
    expect(workouts.length).toEqual(10);
  });
});
