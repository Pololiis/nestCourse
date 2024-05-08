import { IsString } from 'class-validator';

export class CreateCarDTO {
  @IsString({ message: 'The brand must be a string.' })
  readonly brand: string;

  @IsString()
  readonly model: string;
}
