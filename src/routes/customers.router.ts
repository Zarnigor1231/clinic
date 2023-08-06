import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { CustomerController } from '@/controllers/customers.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { UpdateCustomerDto } from '@/dtos/customers.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export class CustomerRoute implements Routes {
  public path = '/customer';
  public router = Router();
  public customer = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['doctor']), this.customer.getCustomers);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['doctor']), this.customer.getCustomerById);
    this.router.put(`${this.path}:id`, ValidationMiddleware(UpdateCustomerDto, true), this.customer.updateCustomer);
  }
}
