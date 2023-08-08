import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Queues } from '@/interfaces/queues.interface';
import { QueueModel } from '@/models/queues.model';
import { Customer } from '@/interfaces/customers.interface';
import { CustomerModel } from '@/models/customers.model';
import { DoctorModel } from '@/models/doctors.model';
import { Doctor } from '@/interfaces/doctors.interface';
import { User } from '@/interfaces/users.interface';
import { newDate } from '@/config/date';

@Service()
export class QueueService {
  public async findAllQueue(): Promise<Queues[]> {
    const queues: Queues[] = await QueueModel.find().populate([
      { path: 'clinicID', select: 'name' },
      { path: 'doctorID', select: ['firstName', 'lastName'] },
      { path: 'userID', select: 'name' },
    ]);
    console.log(queues);
    return queues;
  }

  public async findQueueById(queueId: string): Promise<Queues> {
    const findQueue: Queues = await QueueModel.findOne({ _id: queueId }).populate([
      { path: 'clinicID', select: 'name' },
      { path: 'doctorID', select: ['firstName', 'lastName'] },
      { path: 'userID', select: 'name' },
    ]);
    if (!findQueue) throw new HttpException(409, "Queue doesn't exist");

    return findQueue;
  }

  public async createQueue(queueData: Queues, user: User): Promise<{ createQueueData: Queues; createCustomerData: Customer }> {
    const findDoctor: Doctor = await DoctorModel.findOne({ _id: queueData.doctorID });
    if (!findDoctor) throw new HttpException(409, "Doctor doesn't exist");

    const findQueue: Queues[] = await QueueModel.find({ doctorID: queueData.doctorID });

    const findUsers: Queues[] = await QueueModel.find({ userID: user._id.toString() });

    // const date = '';

    // const customers: Customer[] = await CustomerModel.find({ $and: [{ clinicID: queueData.clinicID }, { userID: queueData.userID }] });
    // if (!customers.length) {
    //   date =
    // }

    if (!findUsers.length) {
      const createQueueData: Queues = await QueueModel.create({
        ...queueData,
        room: findDoctor.roomNo,
        userID: user._id.toString(),
        queue: findQueue.length + 1,
        check: 1,
        date: newDate(),
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
      date: newDate(),
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
