type Concrete<T> = {
  [Property in keyof T]-?: T[Property];
};

type Enumerable<T> = T | T[];

type Nullable<T> = T | null;
