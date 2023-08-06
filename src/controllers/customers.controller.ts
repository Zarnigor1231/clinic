// import { Customer } from '@/interfaces/customers.interface';
import { Customer } from '@/interfaces/customers.interface';
import { Doctor } from '@/interfaces/doctors.interface';
import { Queues } from '@/interfaces/queues.interface';
import { CustomerService } from '@/services/customers.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CustomerController {
  public customer = Container.get(CustomerService);

  public getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctor: Doctor = res.locals.doctor;
      const findAllCustomersData: Queues[] = await this.customer.findAllCustomer(doctor);

      res.status(200).json({ data: findAllCustomersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID: string = req.params.id;
      const doctor: Doctor = res.locals.doctor;
      const findOneCustomerData = await this.customer.findCustomerById(userID, doctor);

      res.status(200).json({ data: findOneCustomerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const customerData: Customer = req.body;
      const updateCustomerData: Customer = await this.customer.updateCustomer(customerId, customerData);

      res.status(200).json({ data: updateCustomerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
