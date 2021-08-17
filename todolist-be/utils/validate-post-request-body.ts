import { StatusCodes } from 'http-status-codes';
import { ITodoModel } from '../types/types';

export default function validatePostRequestBody(): (req, res, next) => void {
  return function (req, res, next): void {
    const { message } = req.body as ITodoModel;

    if (!message) {
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    next();
  }
}
