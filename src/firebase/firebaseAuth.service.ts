import { Inject, Injectable } from '@nestjs/common';
import { FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, Auth, signOut, UserCredential } from 'firebase/auth';
/**
 * Service responsible for handling user authentication using Firebase Authentication.
 */
@Injectable()
export class FirebaseAuthService {
  private auth: Auth;
  /**
   * Creates an instance of FirebaseAuthService.
   * @param app The Firebase App instance injected as a dependency.
   */
  constructor(@Inject('FIREBASE_CLIENT_CONFIG') app: FirebaseApp) {
    this.auth = getAuth(app);
  }

  /**
   * Logs in a user with the provided credentials.
   * @param name The user's name or email address.
   * @param password The user's password.
   * @returns A Promise resolving to a UserCredential object representing the logged-in user.
   * @throws An error if there is an issue with the login process.
   */
  async logIn(name: string, password: string) : Promise<UserCredential>{
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        name,
        password,
      );
      return userCredential;
    } catch (error) {
      throw new Error('Sing in error ' + error.message);
    }
  }
  /**
   * Logs out the current user.
   * @returns A Promise resolving to a string indicating successful logout.
   * @throws An error if there is an issue with the logout process.
   */
  async logOut() : Promise<string> {
    try {
      await signOut(this.auth)
      return "User logged out successfully."
    } catch (error) {
      throw new Error("Error while Loggin out the user: " + error.message)
    }
  }
}
