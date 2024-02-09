import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsNumberString()
  amount: string;
}
