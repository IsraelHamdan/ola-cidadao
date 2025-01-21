export interface ResponsePostagens<T> {
  count: number;
  next: string;
  previous: null;
  results: T;
}
