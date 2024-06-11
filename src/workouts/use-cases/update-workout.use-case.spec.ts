import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutInMemoryRepository } from '../repositories/in-memory/workout.repository';
import { CreateWorkoutUseCase } from './create-workout.use-case';
import { UpdateWorkoutUseCase } from './update-workout.use-case';

describe('Update Workout Use Case Test', () => {
  let useCase: UpdateWorkoutUseCase;
  let createWorkoutUseCase: CreateWorkoutUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateWorkoutUseCase,
        CreateWorkoutUseCase,
        WorkoutInMemoryRepository,
        {
          provide: 'IWorkoutRepository',
          useExisting: WorkoutInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateWorkoutUseCase>(UpdateWorkoutUseCase);
    createWorkoutUseCase =
      module.get<CreateWorkoutUseCase>(CreateWorkoutUseCase);
  });

  it('Should be able to update an workout', async () => {
    const today = new Date();

    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const workout = await createWorkoutUseCase.execute(workoutData);

    const workoutUpdatedData = {
      id: workout.id,
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
      weekly_volume: 150,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const workoutUpdated = await useCase.execute(workoutUpdatedData);

    expect(workoutUpdated.id).toEqual(workout.id);
    expect(workoutUpdated.weekly_volume).toEqual(150);
  });

  it('Should not be able to update an workout that not exists', async () => {
    const today = new Date();

    const workoutUpdatedData = {
      id: 'XXXX',
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
      weekly_volume: 150,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    await expect(() =>
      useCase.execute(workoutUpdatedData),
    ).rejects.toBeInstanceOf(Error);
  });
});
