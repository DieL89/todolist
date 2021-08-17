import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export default function validateIdParam(): (req, res, next) => void {
  return function (req, res, next): void {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(StatusCodes.BAD_REQUEST).send('Id isn\'t valid.');
    }

    next();
  }
}
