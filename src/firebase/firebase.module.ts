import { Module } from '@nestjs/common';
import {  FirebaseAdminService } from './firebase.service';
import {
  firebaseAdminConfig,
  firebaseClientConfig,
} from 'src/config/firebase.config';
import { ConfigService } from '@nestjs/config';
import { FirebaseAuthService } from './firebaseAuth.service';

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        firebaseAdminConfig(configService),
    },
    {
      provide: 'FIREBASE_CLIENT_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        firebaseClientConfig(configService),
    },
    FirebaseAdminService,
    FirebaseAuthService
  ],
  exports: [FirebaseAdminService, FirebaseAuthService],
})
export class FirebaseModule {}
