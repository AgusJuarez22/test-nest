import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
/**
 * Retrieves the Stripe configuration from the environment variables using the ConfigService.
 * Initializes and returns a Stripe instance with the provided API key.
 * @param configService The ConfigService instance used to retrieve environment variables.
 * @returns A configured Stripe instance.
 */
export function stripeConfig(configService: ConfigService) {
   // Initialize and return a new instance of the Stripe class with the provided API key
  const stripe = new Stripe(configService.get<string>('STRIPE_API_KEY'));
  return stripe;
}
