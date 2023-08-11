import { IsString, IsNotEmpty, IsPhoneNumber, IsMongoId, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  public phone: number;

  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  public file: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public serviceID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public clinicID: string;

  @IsString()
  @IsNotEmpty()
  public isTime: string;

  @IsString()
  @IsNotEmpty()
  public isDay: string;

  @IsString()
  @IsNotEmpty()
  public roomNo: number;

  @IsString()
  @IsNotEmpty()
  public startWork: string;
}

export class UpdateDoctorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public lastName: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  @IsOptional()
  public phone: number;

  @IsString({ each: true })
  @IsOptional()
  public file: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public serviceID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public clinicID: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public schedule: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public isDay: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public roomNo: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public startWork: string;
}

export class LoginDoctorDto {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
