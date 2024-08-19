import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/Schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userRepository: Model<User>,
        private commonService: CommonService,
    ) { }

    async createUser(user: User): Promise<User> {
        try {
            user.userId = this.commonService.generateId(4);
            const createdUser = await this.userRepository.create(user);
            return createdUser;
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(userId?: string, email?: string): Promise<User[]> {
        try {
            const query: any = {};
            if (userId) {
                query.userId = userId;
            }
            if (email) {
                query.email = email;
            }
            const user = await this.userRepository.find(query);
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            const updatedUser = await this.userRepository.findOneAndUpdate(
                { userId: user.userId },
                user,
                { new: true });
            return updatedUser;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUser(userId: string): Promise<User> {
        try {
            const deleteUser = await this.userRepository.findOneAndDelete({ userId: userId });
            return deleteUser;
        } catch (error) {
            console.error(error);
        }
    }
}
