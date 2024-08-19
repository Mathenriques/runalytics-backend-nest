import { Test, TestingModule } from '@nestjs/testing';
import { CompareWorkoutsUseCase } from './compare-workouts.use-case';
import { CreateWorkoutUseCase } from './create-workout.use-case';
import { WorkoutInMemoryRepository } from '../repositories/in-memory/workout.repository';

describe('Compare Two Workouts', () => {
  let useCase: CompareWorkoutsUseCase;
  let createWorkoutUseCase: CreateWorkoutUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompareWorkoutsUseCase,
        CreateWorkoutUseCase,
        WorkoutInMemoryRepository,
        {
          provide: 'IWorkoutRepository',
          useExisting: WorkoutInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<CompareWorkoutsUseCase>(CompareWorkoutsUseCase);
    createWorkoutUseCase =
      module.get<CreateWorkoutUseCase>(CreateWorkoutUseCase);
  });

  it('Should be able to compare two workouts with positive results', async () => {
    const today = new Date();

    for (let i = 0; i < 2; i++) {
      const day = i + 1;
      const mult = i + 1;
      const workoutData = {
        start_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        end_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        weekly_volume: 50 * mult,
        strengthening_workouts: 2 + i,
        stress_level: 5 + i,
        sleep_hours: 8 + i,
        diet_level: 1 + i,
        pain_discomfort: '',
        didMyofascialRelease: true,
        user_id: 'XXX',
      };

      await createWorkoutUseCase.execute(workoutData);
    }

    const result = await useCase.execute('XXX');
    expect(result.weekly_volume.value).toBe(50);
    expect(result.strengthening_workouts.value).toBe(1);
    expect(result.stress_level.value).toBe(1);
    expect(result.diet_level.value).toBe(2);
    expect(result.sleep_hours.value).toBe(1);
  });

  it('Should be able to compare two workouts with negative results', async () => {
    const today = new Date();

    for (let i = 0; i < 2; i++) {
      const day = i + 1;
      const mult = i + 1;
      const workoutData = {
        start_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        end_date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000),
        weekly_volume: 50 / mult,
        strengthening_workouts: 2 - i,
        stress_level: 5 - i,
        sleep_hours: 8 - i,
        diet_level: 1 - i,
        pain_discomfort: '',
        didMyofascialRelease: true,
        user_id: 'XXX',
      };

      await createWorkoutUseCase.execute(workoutData);
    }

    const result = await useCase.execute('XXX');
    expect(result.weekly_volume.value).toBe(-25);
    expect(result.strengthening_workouts.value).toBe(-1);
    expect(result.stress_level.value).toBe(-1);
    expect(result.diet_level.value).toBe(0);
    expect(result.sleep_hours.value).toBe(-1);
  });

  it('Should be able to only return only one workout, if just have one created', async () => {
    const today = new Date();

    const workoutData = {
      start_date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      end_date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      weekly_volume: 50,
      strengthening_workouts: 2,
      stress_level: 5,
      sleep_hours: 8,
      diet_level: 1,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    await createWorkoutUseCase.execute(workoutData);

    const result = await useCase.execute('XXX');
    expect(result).toBeTruthy();
  });

  it('Should be able to return empty if there are no workouts created', async () => {
    const result = await useCase.execute('XXX');
    expect(result).toBeTruthy();
  });
});
