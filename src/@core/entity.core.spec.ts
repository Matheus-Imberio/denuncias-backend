import { UUID } from 'src/shared/utils/uuid';
import { describe, expect, it } from 'vitest';
import { Entity } from './entity.core';

class CustomEntity extends Entity<object> {}
class AnotherCustomEntity {}

describe('[unit] test Entity core', () => {
  it('should throw an error if the provided ID is not a UUID', () => {
    expect(() => new CustomEntity({}, 'invalid-uuid')).toThrow(
      'The provided id "invalid-uuid" is not a valid UUID v7.',
    );
  });

  it('should throw an error if the provided ID is not a UUID v7', () => {
    expect(
      () => new CustomEntity({}, 'bc88ca7f-73d7-4f95-b4ad-c592bd64a0ca'),
    ).toThrow(
      'The provided id "bc88ca7f-73d7-4f95-b4ad-c592bd64a0ca" is not a valid UUID v7.',
    );
  });

  it('should use the provided ID if provided', () => {
    const uuid = UUID.create();
    const entity = new CustomEntity({}, uuid);

    expect(entity.id).toEqual(uuid);
  });

  it('should be able to check equality', () => {
    const uuid = UUID.create();
    const entityOne = new CustomEntity({}, uuid);
    const entityTwo = new CustomEntity({}, uuid);

    // @ts-expect-error - null é um valor teste para verificar se a função funciona
    expect(entityOne.equals(null)).toBe(false);
    expect(entityOne.equals(new AnotherCustomEntity() as Entity<object>)).toBe(
      false,
    );

    expect(entityOne.equals(entityOne)).toBe(true);
    expect(entityOne.equals(entityTwo)).toBe(true);
  });
});
