import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateWorkoutDto {
  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsNumber()
  weekly_volume: number;

  @IsNumber()
  strengthening_workouts: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  stress_level: number;

  @IsNumber()
  sleep_hours: number;

  @IsNumber()
  diet_level: number;

  @IsBoolean()
  didMyofascialRelease: boolean;

  @IsString()
  pain_discomfort: string;

  @IsString()
  user_id: string;
}
