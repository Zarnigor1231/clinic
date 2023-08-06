import { IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  public phone: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;
}

export class UpdateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;
}

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  public password: string;
}
