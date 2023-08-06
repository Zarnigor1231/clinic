import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CreateServiceDto, UpdateServiceDto } from '@/dtos/services.dto';
import { ServiceController } from '@/controllers/services.controller';

export class ServiceRoute implements Routes {
  public path = '/service';
  public router = Router();
  public service = new ServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.service.getServices);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['admin']), this.service.getServiceById);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreateServiceDto, true), this.service.createService);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['admin']), ValidationMiddleware(UpdateServiceDto, true, true), this.service.updateService);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.service.deleteService);
  }
}
