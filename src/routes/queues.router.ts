import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { QueueController } from '@/controllers/queues.controller';
import { CreateQueueDto } from '@/dtos/queues.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class QueueRoute implements Routes {
  public path = '/queue';
  public router = Router();
  public queue = new QueueController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.queue.getQueues);
    this.router.get(`${this.path}/:id`, this.queue.getQueueById);
    this.router.post(`${this.path}`, AuthMiddleware(['user']), ValidationMiddleware(CreateQueueDto, true), this.queue.createQueue);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['user']), this.queue.deleteQueue);
  }
}
