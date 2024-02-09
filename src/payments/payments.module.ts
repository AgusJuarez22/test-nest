import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ConfigService } from '@nestjs/config';
import { stripeConfig } from 'src/config/stripe.config';
import { PaymentsController } from './payments.controller';

@Module({
  providers: [
    {
      provide: 'STRIPE_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => stripeConfig(configService),
    },
    PaymentsService,
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
