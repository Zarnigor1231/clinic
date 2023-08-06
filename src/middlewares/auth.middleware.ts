import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/users.model';
import { DoctorModel } from '@/models/doctors.model';

export const getAuthorization = (req: Request) => {
  const coockie = req.cookies['Authorization'];

  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = (roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = getAuthorization(req);

      if (Authorization) {
        const { _id, login } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;

        let findUser;

        if (roles.includes('admin')) {
          if (login !== 'clinika') {
            return res.status(403).json({
              message: 'You do not have administrator rights',
            });
          }
          findUser = login;
        } else if (roles.includes('user')) {
          findUser = await UserModel.findOne({ _id });

          if (!findUser) {
            return res.status(403).json({
              message: 'You do not have user rights',
            });
          }
          res.locals.user = findUser;
        } else if (roles.includes('doctor')) {
          findUser = await DoctorModel.findOne({ _id });

          if (!findUser) {
            return res.status(403).json({
              message: 'You do not have user rights',
            });
          }
          res.locals.doctor = findUser;
        }

        if (findUser) {
          req.user = findUser;
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };
};
