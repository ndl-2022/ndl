export interface Response<T> {
  data: T;
  metadata: {
    total?: number;
  };
}
