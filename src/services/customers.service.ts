import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Customer } from '@/interfaces/customers.interface';
import { CustomerModel } from '@/models/customers.model';
import { Queues } from '@/interfaces/queues.interface';
import { QueueModel } from '@/models/queues.model';
import { Doctor } from '@/interfaces/doctors.interface';

@Service()
export class CustomerService {
  public async findAllCustomer(doctor: Doctor): Promise<Queues[]> {
    const customers: Queues[] = await QueueModel.find({ doctorID: doctor._id.toString() });

    return customers;
  }

  public async findCustomerById(userID: string, doctor: Doctor): Promise<Customer> {
    const findCustomer: Customer = await CustomerModel.findOne({ $and: [{ userID }, { doctorID: doctor._id.toString() }] });
    if (!findCustomer) throw new HttpException(409, "Customer doesn't exist");

    return findCustomer;
  }

  public async updateCustomer(customerId: string, customerData: Customer): Promise<Customer> {
    const updateCustomerById: Customer = await CustomerModel.findByIdAndUpdate(customerId, { customerData });
    if (!updateCustomerById) throw new HttpException(409, "Customer doesn't exist");

    return updateCustomerById;
  }
}
