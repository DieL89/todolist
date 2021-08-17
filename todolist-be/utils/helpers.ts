import { IQueryOptions, ITodoModel } from "../types/types";

export function getQueryOptions(reqQuery: any): IQueryOptions {
  if (!reqQuery.page && !reqQuery.limit) {
    return null;
  }

  const page: number = +(reqQuery.page || 1);
  const limit: number = +(reqQuery.limit || 10);

  return {
    skip: (page - 1) * limit,
    limit,
  };
}

export function getPatchTodoModel(reqBody: ITodoModel): ITodoModel {
  const patchBody: ITodoModel = Object.keys(reqBody).reduce((obj, key) => {
    if (reqBody[key] == undefined) {
      return obj;
    }

    obj[key] = reqBody[key];

    return obj;
  }, {});

  return patchBody;
}
