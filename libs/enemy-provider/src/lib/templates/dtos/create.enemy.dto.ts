import { IsString, Length, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateEnemyDto {
  @IsString()
  @Length(3, 50)
  declare name: string;

  @IsNumber()
  @Min(1)
  declare health: number;

  @IsNumber()
  @Min(1)
  declare reward: number;

  @IsNumber()
  @Min(1)
  declare speed: number;

  @IsString()
  declare sprite: string; // path to sprite

  @IsString()
  @IsOptional()
  declare description?: string;

  @IsString()
  @IsOptional()
  declare externalResourceLink?: string;
}
