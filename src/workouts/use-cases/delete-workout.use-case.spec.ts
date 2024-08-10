import { Test, TestingModule } from '@nestjs/testing';
import { CreateWorkoutUseCase } from './create-workout.use-case';
import { WorkoutInMemoryRepository } from '../repositories/in-memory/workout.repository';
import { DeleteWorkoutUseCase } from './delete-workout.use-case';

describe('Delete Workout Use Case Test', () => {
  let useCase: DeleteWorkoutUseCase;
  let createWorkoutUseCase: CreateWorkoutUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateWorkoutUseCase,
        DeleteWorkoutUseCase,
        WorkoutInMemoryRepository,
        {
          provide: 'IWorkoutRepository',
          useExisting: WorkoutInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteWorkoutUseCase>(DeleteWorkoutUseCase);
    createWorkoutUseCase =
      module.get<CreateWorkoutUseCase>(CreateWorkoutUseCase);
  });

  it('Should be able to delete an workout', async () => {
    const today = new Date();
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      diet_level: 1,
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const { id } = await createWorkoutUseCase.execute(workoutData);

    const result = await useCase.execute(id);
    expect(result).toBe(1);
  });

  it('Should not be able to delete an workout that not exists', async () => {
    await expect(() => useCase.execute('XXX')).rejects.toBeInstanceOf(Error);
  });
});
