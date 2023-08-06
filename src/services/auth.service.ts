import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { Admin } from '@/interfaces/admins.interfaces';
import { Doctor } from '@/interfaces/doctors.interface';
import { DoctorModel } from '@/models/doctors.model';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createTokenAdmin = (admin: Admin): TokenData => {
  const dataStoredInToken: DataStoredInToken = admin;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createTokenDoctor = (doctor: Doctor): TokenData => {
  const dataStoredInToken: DataStoredInToken = doctor;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ phone: userData.phone });
    if (findUser) throw new HttpException(409, `This number ${userData.phone} is already registered, Please enter another number`);

    const hashedPassword = await hash(userData.password, 10);

    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await UserModel.findOne({ firstName: userData.login });
    if (!findUser) throw new HttpException(409, `This first name ${userData.login} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = createToken({ _id: findUser._id } as User);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ firstName: userData.firstName, password: userData.password });
    if (!findUser) throw new HttpException(409, `This first name ${userData.firstName} was not found`);

    return findUser;
  }

  public async loginForAdmin(adminData: Admin): Promise<{ cookie: string }> {
    if (adminData.login.toLocaleLowerCase() === 'clinika' && adminData.password == 'admin') {
      const tokenData = createTokenAdmin({ login: adminData.login } as Admin);
      const cookie = createCookie(tokenData);

      return { cookie };
    }
  }

  public async loginForDoctor(doctorData: Doctor): Promise<{ cookie: string; findDoctor: Doctor }> {
    const findDoctor: Doctor = await DoctorModel.findOne({ phone: doctorData.password });
    if (!findDoctor) throw new HttpException(409, `This password ${doctorData.password} was not found`);

    if (doctorData.login.toLocaleLowerCase() === 'clinika') {
      const tokenData = createTokenDoctor({ _id: findDoctor._id } as Doctor);
      const cookie = createCookie(tokenData);

      return { cookie, findDoctor };
    }
  }
}
