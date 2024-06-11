import { Test, TestingModule } from '@nestjs/testing';
import { CreateWorkoutUseCase } from './create-workout.use-case';
import { WorkoutInMemoryRepository } from '../repositories/in-memory/workout.repository';

describe('Create Workout Use Case Test', () => {
  let useCase: CreateWorkoutUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateWorkoutUseCase,
        WorkoutInMemoryRepository,
        {
          provide: 'IWorkoutRepository',
          useExisting: WorkoutInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateWorkoutUseCase>(CreateWorkoutUseCase);
  });

  it('Should be able to create an new workout', async () => {
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(),
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const { start_date, end_date } = await useCase.execute(workoutData);

    expect(start_date).toEqual(workoutData.start_date);
    expect(end_date).toEqual(workoutData.end_date);
  });
});
