export type Nullable<T> = T | null;

export type PageParams<T extends Record<string, string> = Record<string, string>> =
  Promise<T>;
