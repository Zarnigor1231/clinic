import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { PriceController } from '@/controllers/prices.contoller';

export class PriceRoute implements Routes {
  public path = '/price';
  public router = Router();
  public price = new PriceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.price.getPrices);
  }
}
