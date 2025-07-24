export type PickRequired<E, P extends keyof E> = {
  [K in P]-?: Exclude<E[K], null | undefined>;
};

export type RequireOnly<E, P extends keyof E> = PickRequired<E, P> &
  Partial<Omit<E, P>>;
