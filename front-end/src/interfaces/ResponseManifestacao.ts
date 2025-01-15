export interface ResponseManifestacao<T> {
  count: number;
  next: string;
  previous: null;
  results: T;
}
