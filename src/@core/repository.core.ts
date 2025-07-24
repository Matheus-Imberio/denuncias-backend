import { Entity } from './entity.core';

export abstract class Repository<T extends Entity<unknown>> {
  abstract create(...args: unknown[]): Promise<unknown>;
  abstract findAll(...args: unknown[]): Promise<T[]>;
  abstract findOne(...args: unknown[]): Promise<unknown>;
  abstract update(...args: unknown[]): Promise<unknown>;
  abstract remove(...args: unknown[]): Promise<unknown>;
}
