import { StatusCodes } from 'http-status-codes';

export default function validatePaginationParams(): (req, res, next) => void {
  return function (req, res, next): void {
    if (isNotNumber(req.query.page) || isNotNumber(req.query.limit)) {
      return res.status(StatusCodes.BAD_REQUEST).send('Pagination params are incorrect.');
    }

    next();
  }

  function isNotNumber(param: string): boolean {
    return param && !(parseInt(param, 10).toString() === param);
  }
}
