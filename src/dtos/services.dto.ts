import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public price: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public clinicID: string;
}

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public price: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  public clinicID: string;
}
