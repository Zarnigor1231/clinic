import { Queues } from '@/interfaces/queues.interface';
import { QueueService } from '@/services/queues.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class QueueController {
  public queue = Container.get(QueueService);

  public getQueues = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllQueuesData: Queues[] = await this.queue.findAllQueue();

      res.status(200).json({ data: findAllQueuesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getQueueById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queueId: string = req.params.id;
      const findOneQueueData: Queues = await this.queue.findQueueById(queueId);

      res.status(200).json({ data: findOneQueueData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queueData: Queues = req.body;
      const user = res.locals.user;
      const { createQueueData, createCustomerData } = await this.queue.createQueue(queueData, user);

      res.status(201).json({ data: createQueueData, customer: createCustomerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queueId: string = req.params.id;
      const deleteQueueData: Queues = await this.queue.deleteQueue(queueId);

      res.status(200).json({ data: deleteQueueData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
