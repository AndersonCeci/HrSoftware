import {
  IsOptional,
} from 'class-validator';

export class CoordinatesDto {
  @IsOptional()
  locationName?: string;

  @IsOptional()
  longtitude?: string;

  @IsOptional()
  latitude?: string;
}
