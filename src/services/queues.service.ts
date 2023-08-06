import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Queues } from '@/interfaces/queues.interface';
import { QueueModel } from '@/models/queues.model';
import { Customer } from '@/interfaces/customers.interface';
import { CustomerModel } from '@/models/customers.model';
import { DoctorModel } from '@/models/doctors.model';
import { Doctor } from '@/interfaces/doctors.interface';
import { User } from '@/interfaces/users.interface';

@Service()
export class QueueService {
  public async findAllQueue(): Promise<Queues[]> {
    const queues: Queues[] = await QueueModel.find()
      .populate({ path: 'clinic', select: 'name' })
      .populate({ path: 'doctor', select: 'name' })
      .populate({ path: 'user', select: 'name' });
    return queues;
  }

  public async findQueueById(queueId: string): Promise<Queues> {
    const findQueue: Queues = await QueueModel.findOne({ _id: queueId })
      .populate({ path: 'clinic', select: 'name' })
      .populate({ path: 'doctor', select: 'name' })
      .populate({ path: 'user', select: 'name' });
    if (!findQueue) throw new HttpException(409, "Queue doesn't exist");

    return findQueue;
  }

  public async createQueue(queueData: Queues, user: User): Promise<{ createQueueData: Queues; createCustomerData: Customer }> {
    const findDoctor: Doctor = await DoctorModel.findOne({ _id: queueData.doctorID });
    if (!findDoctor) throw new HttpException(409, "Doctor doesn't exist");

    const findQueue: Queues[] = await QueueModel.find({ doctorID: queueData.doctorID });

    const findUsers: Queues[] = await QueueModel.find({ userID: user._id.toString() });
    if (!findUsers.length) {
      const createQueueData: Queues = await QueueModel.create({
        ...queueData,
        room: findDoctor.roomNo,
        userID: user._id.toString(),
        queue: findQueue.length + 1,
        check: 1,
      });
      const createCustomerData: Customer = await CustomerModel.create({ userID: createQueueData.userID, doctorID: createQueueData.doctorID });

      return { createQueueData, createCustomerData };
    }

    const createQueueData: Queues = await QueueModel.create({
      ...queueData,
      room: findDoctor.roomNo,
      userID: user._id.toString(),
      queue: findQueue.length + 1,
      check: ++findUsers[findUsers.length - 1].check,
    });

    const createCustomerData: Customer = await CustomerModel.create({ userID: createQueueData.userID, doctorID: createQueueData.doctorID });

    return { createQueueData, createCustomerData };
  }

  public async deleteQueue(queueId: string): Promise<Queues> {
    const deleteQueueById: Queues = await QueueModel.findByIdAndDelete(queueId);
    if (!deleteQueueById) throw new HttpException(409, "Queue doesn't exist");

    return deleteQueueById;
  }
}
