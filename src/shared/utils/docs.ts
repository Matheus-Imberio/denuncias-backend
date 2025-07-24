/* eslint-disable @typescript-eslint/no-explicit-any */
export type DocKeys<T extends (...args: any) => any> = Record<
  keyof ReturnType<T>,
  any
>;

/**
 * Retorna um novo objeto sem as propriedades selecionadas do primeiro.
 * Utiliza o structuredClone, promovendo a imutabilidade do objeto passado.
 **/
export function omit<
  O extends Record<string, any>,
  K extends keyof O,
  R = Omit<O, K>,
>(obj: O, ...keys: Array<K>): R {
  const clone = structuredClone(obj);
  keys.forEach((key) => delete clone[key]);
  return clone as unknown as R;
}

/**
 * Retorna um novo objeto com apenas as propriedades selecionadas do primeiro.
 * Cada propriedade selecionada tem seu valor copiado com o structuredClone,
 * garantindo a imutabilidade do primeiro objeto.
 **/
export function pick<
  O extends Record<string, any>,
  K extends keyof O,
  R = Pick<O, K>,
>(obj: O, ...keys: Array<K>) {
  const newObj = {} as R;

  keys.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    newObj[key as any] = structuredClone(obj[key]);
  });

  return newObj;
}

/**
 * Combina as propriedades do segundo objeto para o primeiro, utilizando o Object.assign.
 * A vantagem de utilizar esta função é que ela promove imutabilidade, ou seja, não altera
 * o primeiro objeto, e sim um clone dele, que é retornado.
 **/
export function merge<O1 extends object, O2>(obj1: O1, obj2: O2) {
  const clone = structuredClone(obj1);
  return Object.assign(clone, obj2);
}
