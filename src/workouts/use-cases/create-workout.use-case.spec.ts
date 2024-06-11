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
    const today = new Date();
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date
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

  it('Should not be able to create an new workout with a duplicated date', async () => {
    const today = new Date();
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date,
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    await useCase.execute(workoutData);

    await expect(() => useCase.execute(workoutData)).rejects.toBeInstanceOf(
      Error,
    );
  });

  it('Should not be able to create an new workout with end date between start and end date that exists', async () => {
    const today = new Date();
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date,
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const workoutDuplicatedData = {
      start_date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // Define o start date para antes de ontem
      end_date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Define o end date para depois de amanhã
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    await useCase.execute(workoutData);

    await expect(() =>
      useCase.execute(workoutDuplicatedData),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should not be able to create an new workout with start date between start and end date that exists', async () => {
    const today = new Date();
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date,
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const workoutDuplicatedData = {
      start_date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Define o start date para depois de amanhã
      end_date: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    await useCase.execute(workoutData);

    await expect(() =>
      useCase.execute(workoutDuplicatedData),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should not be able to create an new workout where days beetwen start and end date are in another workout ', async () => {
    const today = new Date();
    const workoutData = {
      start_date: new Date(),
      end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date,
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    const workoutDuplicatedData = {
      start_date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // Define o start date para antes de ontem
      end_date: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000), // Define o end date para 7 dias depois do start date
      weekly_volume: 50,
      strengthening_workouts: 3,
      stress_level: 5,
      sleep_hours: 8,
      pain_discomfort: '',
      didMyofascialRelease: true,
      user_id: 'XXX',
    };

    await useCase.execute(workoutData);

    await expect(() =>
      useCase.execute(workoutDuplicatedData),
    ).rejects.toBeInstanceOf(Error);
  });
});
