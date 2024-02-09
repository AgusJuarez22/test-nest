import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDto } from './dto/create-payment.dto';
/**
 * Service responsible for handling payment operations using Stripe.
 */

@Injectable()
export class PaymentsService {
  constructor(@Inject('STRIPE_CONFIG') private stripe: Stripe) {}
  
  /**
   * Creates a payment intent.
   * @param payment The payment data including the amount.
   * @returns A Promise resolving to a Stripe.PaymentIntent object.
   */
  async createPaymentIntent(payment: PaymentDto) : Promise<Stripe.Response<Stripe.PaymentIntent>>{
    //Stripe only accepts amounts in the smallest valid unit of the selected currency
    //The function `parseAmountToCent` converts the amount to a float and then parses it to cents.
    const amount = this.parseAmountToCent(payment.amount);

    //creates the paymentIntent
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });
      return paymentIntent;
    } catch (e) {
      switch (e.type) {
        case 'StripeCardError':
          throw new Error('A payment error occurred: ' + e.message);
        case 'StripeInvalidRequestError':
          throw new Error('An invalid request occurred: ' + e.message);

        default:
          throw new Error(
            'Another problem occurred, maybe unrelated to Stripe: ' + e.message,
          );
      }
    }
  }
  /**
   * Converts the given amount to cents.
   * @param amount The amount to convert.
   * @returns The amount in cents.
   */
  private parseAmountToCent(amount: string) {
    const validAmount = parseFloat(amount);
    return Math.round(validAmount * 100);
  }
}
