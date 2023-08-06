import { IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  public young: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public young: string;

  @IsOptional()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  public phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsOptional()
  public oldPassword: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  public password: string;
}
