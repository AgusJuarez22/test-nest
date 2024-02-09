import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
/**
 * Service responsible for interacting with the Firebase Admin SDK for user management.
 */
@Injectable()
export class FirebaseAdminService {
  private auth: Auth;

   /**
   * Creates an instance of FirebaseAdminService.
   * @param firebaseApp The Firebase Admin instance injected as a dependency.
   */
  constructor(@Inject('FIREBASE_ADMIN_CONFIG') private firebaseApp: app.App) {
    this.auth = firebaseApp.auth();
  }
  /**
   * Creates a new user in Firebase.
   * @param user The user data including email and password.
   * @returns A Promise resolving to a UserRecord object representing the created user.
   * @throws An error if there is an issue creating the user.
   */
  async createUser(user: CreateUserDto): Promise<UserRecord> {
    try {
      const createdUser = await this.auth.createUser({
        email: user.email,
        password: user.password,
      });
      return createdUser;
    } catch (error) {
      throw new Error(
        'Error while creating a user on Firebase: ' + error.message,
      );
    }
  }

  /**
   * Deletes a user from Firebase.
   * @param userId The ID of the user to delete.
   * @returns A Promise resolving when the user is successfully deleted.
   * @throws An error if there is an issue deleting the user.
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await this.auth.deleteUser(userId);
    } catch (error) {
      throw new Error(
        'Error while deleting a user from Firebase: ' + error.message,
      );
    }
  }
}
