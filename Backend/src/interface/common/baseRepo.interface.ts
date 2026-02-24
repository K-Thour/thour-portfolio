export type IBaseRepoParams<T> = Partial<T> & {
  filter?: Partial<T>;
  populate?: {
    path: Extract<keyof T, string>;
    populate?: IBaseRepoParams<T>['populate'];
  };
  select?: Extract<keyof T, string>[];
  sort?: Partial<Record<Extract<keyof T, string>, 1 | -1>>;
};

export interface IBaseRepo<T> {
  get(params: IBaseRepoParams<T>): Promise<T[]>;
  getById(id: string, params: IBaseRepoParams<T>): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  softDelete(id: string): Promise<T | null>;
  deleteOne(id: string): Promise<T | null>;
}
