import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a payment intent',
    description:
      'Validates the given amount, which should be greater than $0.50 USD, converts the string to a float, and returns a payment intent if the operation is successful.',
  })
  async createPayment(
    @Body() payment: PaymentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    try {
      const response = await this.paymentService.createPaymentIntent(payment);
      return response;
    } catch (e) {
      if (e.message.includes('invalid request')) {
        throw new BadRequestException('Error with the input', {
          cause: new Error(),
          description: e.message,
        });
      }
      if (e.message.includes('A payment error')) {
        throw new ForbiddenException('Payment error', {
          cause: new Error(),
          description: e.message,
        });
      }
      if (e.message.includes('Another problem')) {
        throw new InternalServerErrorException('Server error', {
          cause: new Error(),
          description: e.message,
        });
      }
    }
  }
}
