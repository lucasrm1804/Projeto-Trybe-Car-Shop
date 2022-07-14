import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

export interface ServiceError {
  error: ZodError;
}
abstract class Service<T> {
  constructor(protected model: MongoModel<T>) { }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  // public async readOne(id: string): Promise<T | null | ServiceError> {
  //   return this.model.readOne(id);
  // }
}

export default Service;