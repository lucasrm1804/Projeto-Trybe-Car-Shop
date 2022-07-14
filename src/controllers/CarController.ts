import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './index';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }
  
  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const newCar = req.body;
    try {
      const car = await this.service.create(newCar);
      if (!car) { 
        return res.status(400).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400)
          .json({ error: this.errors.mustCharacters });
      }
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const data = req.body;
    try { 
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.mustCharacters });
      }
      const car = await this.service.update(id, data);
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in car) { return res.status(400).json(car); }
      return res.json(car);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400)
          .json({ error: this.errors.mustCharacters });
      }
      const car = await this.service.delete(id);
      return car
        ? res.status(204).send()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;