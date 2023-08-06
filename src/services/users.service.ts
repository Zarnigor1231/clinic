import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ phone: userData.phone });
    if (findUser) throw new HttpException(409, `This phone ${userData.phone} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (userData.phone) {
      const findUser: User = await UserModel.findOne({ phone: userData.phone });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This phone ${userData.phone} already exists`);
    }

    if (userData.oldPassword && userData.password) {
      const findUserId: User = await UserModel.findById({ _id: userId });

      const isPasswordMatching: boolean = await compare(userData.oldPassword, findUserId.password);
      if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

      const hashedPassword = await hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}
