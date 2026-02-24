export interface ICommonResponse<T> {
  data: T[] | T | null;
  total: number;
  message: string;
  statusCode: number;
  success: boolean;
}
