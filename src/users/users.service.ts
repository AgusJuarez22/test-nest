import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FirebaseAdminService } from 'src/firebase/firebase.service';
import * as argon from 'argon2';
import { GetUserDto } from './dto/get-user.dto';

/**
 * Service responsible for user management, including creation and deletion.
 */
@Injectable()
export class UsersService {
   /**
   * Creates an instance of UsersService.
   * @param userModel The Mongoose Model instance for the User schema.
   * @param firebaseAdminRepository The FirebaseAdminService instance injected as a dependency.
   */
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private firebaseAdminRepository: FirebaseAdminService,
  ) {}
  /**
   * Creates a new user in the system, storing their data in both Firestore and MongoDB.
   * @param user The user data to be created, including email and password.
   * @returns A Promise resolving to a GetUserDto object representing the created user.
   * @throws An error if there is an issue creating the user.
   */
  async create(user: CreateUserDto): Promise<GetUserDto> {
    let userIdFromFirebase: string;
    try {
      //Add user to firestore
      const userRecord = await this.firebaseAdminRepository.createUser(user)

      //Hash the password
      user.password = await argon.hash(user.password);

      // Get the ID of the user added to Firestore
      userIdFromFirebase = userRecord.uid;
      const userForMongoDB = { ...user, _id: userIdFromFirebase };

      try {
        // Add user to MongoDB with the ID of the user in Firestore
        const createdUser = new this.userModel(userForMongoDB);
        const userCreatedMongoDB = await createdUser.save();
        // Map the user returned by MongoDB to GetUserDto
        const userDto = this.mapUserToUserDto(userCreatedMongoDB);
        return userDto;
      } catch (mongoDbError) {
        // Rollback by deleting the user from Firebase if saving to MongoDB fails
        this.deleteUserFromFirebase(userIdFromFirebase);
        throw new Error(mongoDbError.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Deletes a user from Firebase.
   * @param userId The ID of the user to delete.
   * @returns A Promise resolving when the user is successfully deleted from Firebase.
   */
  private async deleteUserFromFirebase(userId: string): Promise<void> {
    await this.firebaseAdminRepository.deleteUser(userId);
  }

  /**
   * Maps a User object to a GetUserDto object with limited fields.
   * @param user The user object to map.
   * @returns A GetUserDto object representing the user.
   */
  private mapUserToUserDto(user: User): GetUserDto {
    const userDto: GetUserDto = {
      email: user.email,
      _id: user._id,
    };
    return userDto;
  }
}
