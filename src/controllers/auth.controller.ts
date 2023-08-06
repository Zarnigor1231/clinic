import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { Admin } from '@/interfaces/admins.interfaces';
import { Doctor } from '@/interfaces/doctors.interface';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public loginForAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: Admin = req.body;
      const { cookie } = await this.auth.loginForAdmin(adminData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public loginForDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorData: Doctor = req.body;
      const { cookie, findDoctor } = await this.auth.loginForDoctor(doctorData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findDoctor, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}
