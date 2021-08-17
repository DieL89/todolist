export interface IQueryOptions {
  skip: number,
  limit: number,
}

export interface ITodoModel {
  message?: string,
  completed?: boolean,
}

export interface IPagedResult {
  data?: any[],
  page: number,
  totalPages: number,
  limit: number,
}
