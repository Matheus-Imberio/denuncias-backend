import {
  v7 as uuidv7,
  validate as validateUuid,
} from 'uuid';
import { z } from 'zod';

export class UUID {
  static create(): string {
    return uuidv7();
  }

  static validate(uuid: string): boolean {
    return validateUuid(uuid); 
  }

  static z() {
    return z.string().refine(UUID.validate, 'Expected a valid UUID');
  }
}