import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminController } from '@/controllers/admins.controllers';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public admin = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['admin']), this.admin.getAdmins);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['admin']), this.admin.getAdminById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateAdminDto, true), this.admin.createAdmin);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['admin']), ValidationMiddleware(CreateAdminDto, true, true), this.admin.updateAdmin);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.admin.deleteAdmin);
  }
}
