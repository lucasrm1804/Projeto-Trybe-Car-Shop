import { z } from 'zod';
import { vehicleSchema } from './VehicleInterface';

const CarSchema = vehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type Car = z.infer<typeof CarSchema>;

export { CarSchema };