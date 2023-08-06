import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiagnosisDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public customerID: string;

  @IsString()
  @IsNotEmpty()
  public diagnosText: string;

  @IsString()
  @IsNotEmpty()
  public file: string;
}
