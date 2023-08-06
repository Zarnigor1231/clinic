import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  public files: string[];

  @IsString({ each: true })
  public callSenter: string[];
}

export class UpdateClinicDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsString({ each: true })
  @IsOptional()
  @ValidateIf((obj, value) => {
    if (value) {
      obj.files = JSON.parse(value);
    }
    return true;
  })
  public files: string[];

  @IsOptional()
  @IsString()
  public callSenter: string[];
}
