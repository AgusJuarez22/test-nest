import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/login-auth.dto';
import { FirebaseAuthService } from 'src/firebase/firebaseAuth.service';
import { UserCredential } from 'firebase/auth';
/**
 * Service responsible for handling authentication operations.
 */
@Injectable()
export class AuthService {
   /**
   * Creates an instance of AuthService.
   * @param firebaseAuth The FirebaseAuthService instance injected as a dependency.
   */
  constructor(private firebaseAuth: FirebaseAuthService) {}

  /**
   * Logs in a user using Firebase Authentication.
   * @param authDto The authentication data including email and password.
   * @returns A Promise resolving to a UserCredential object representing the logged-in user.
   */
  async login(authDto: AuthDto) : Promise<UserCredential> {
    const response = await this.firebaseAuth.logIn(
      authDto.email,
      authDto.password,
    );
    return response;
  }
  /**
   * Logs out the current user.
   * @returns A Promise resolving to a string indicating successful logout.
   */
  async logout(): Promise<string> {
    const response = await this.firebaseAuth.logOut();
    return response;
  }
 
}
