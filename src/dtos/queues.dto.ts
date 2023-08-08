import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public clinicID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public doctorID: string;
}
