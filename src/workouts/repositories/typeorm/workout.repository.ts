import { Workout } from 'src/workouts/entities/workout.entity';
import { IWorkoutRepository } from '../IWorkoutRepository';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutFeedback } from 'src/workouts/use-cases/compare-workouts.use-case';

export class WorkoutTypeORMRepository implements IWorkoutRepository {
  constructor(
    @InjectRepository(Workout)
    private typeOrmRepository: Repository<Workout>,
  ) {}

  async create(data: Workout): Promise<void> {
    await this.typeOrmRepository.save(data);
  }

  async getWorkoutBetweenDates(
    startDate: Date,
    endDate: Date,
    user_id: string,
  ): Promise<Workout[]> {
    return await this.typeOrmRepository.find({
      where: [
        {
          user_id,
          deletedDate: null,
          start_date: Between(startDate, endDate),
          end_date: Between(startDate, endDate),
        },
        {
          user_id,
          deletedDate: null,
          start_date: LessThanOrEqual(endDate),
          end_date: MoreThanOrEqual(startDate),
        },
      ],
    });
  }

  async getAllUserWorkouts(user_id: string): Promise<Workout[]> {
    return await this.typeOrmRepository.find({
      where: { user_id, deletedDate: null },
    });
  }

  async getLastTwoOnes(user_id: string): Promise<WorkoutFeedback[]> {
    return await this.typeOrmRepository.find({
      where: { user_id, deletedDate: null },
      select: {
        stress_level: true,
        weekly_volume: true,
        sleep_hours: true,
        strengthening_workouts: true,
        diet_level: true,
      },
      order: { start_date: 'DESC' },
      take: 2,
    });
  }

  async findById(id: string): Promise<Workout> {
    return await this.typeOrmRepository.findOneBy({ id });
  }

  async update(data: Workout): Promise<Workout> {
    await this.typeOrmRepository.update(data.id, data);

    return await this.typeOrmRepository.findOneBy({ id: data.id });
  }

  async delete(id: string): Promise<number | null> {
    const { affected } = await this.typeOrmRepository.softDelete({ id });

    return affected;
  }
}
