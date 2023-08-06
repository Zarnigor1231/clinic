import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateCustomerDto {
  @IsBoolean()
  @IsNotEmpty()
  public status: string;
}
