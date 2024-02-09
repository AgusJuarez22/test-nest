import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user.schema';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    FirebaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
