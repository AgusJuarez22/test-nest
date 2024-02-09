import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';


/**
 * Retrieves the Firebase Admin configuration from the environment variables using the ConfigService.
 * @param configService The ConfigService instance used to retrieve environment variables.
 * @returns The initialized Firebase Admin app.
 */
export function firebaseAdminConfig(configService: ConfigService) {
  const firebaseAdminConfig = {
    type: configService.get<string>('TYPE'),
    project_id: configService.get<string>('PROJECT_ID'),
    private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
    private_key: configService.get<string>('PRIVATE_KEY'),
    client_email: configService.get<string>('CLIENT_EMAIL'),
    client_id: configService.get<string>('CLIENT_ID'),
    auth_uri: configService.get<string>('AUTH_URI'),
    token_uri: configService.get<string>('TOKEN_URI'),
    auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
    client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
    universe_domain: configService.get<string>('UNIVERSAL_DOMAIN'),
  } as admin.ServiceAccount;

  return admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: `https://${firebaseAdminConfig.projectId}.firebaseio.com`,
    storageBucket: `${firebaseAdminConfig.projectId}.appspot.com`,
  });
}
/**
 * Retrieves the Firebase Client configuration from the environment variables using the ConfigService.
 * @param configService The ConfigService instance used to retrieve environment variables.
 * @returns The initialized Firebase Client app.
 */
export function firebaseClientConfig(configService: ConfigService) {
  const firebaseClientConfig = {
    apiKey: configService.get<string>('FIREBASE_CLIENT_API_KEY'),
    authDomain: configService.get<string>('AUTH_DOMAIN'),
    projectId: configService.get<string>('PROJECT_ID'),
    storageBucket: configService.get<string>('STORAGE_BUCKET'),
    messagingSenderId: configService.get<string>('MESSAGING_SENDER_ID'),
    appId: configService.get<string>('FIREBASE_APP_ID'),
  };

  // Initialize Firebase
  const app = initializeApp(firebaseClientConfig);
}
