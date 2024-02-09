import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    FirebaseModule,
    AuthModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
