import { StatusCodes } from 'http-status-codes';

export default function validatePatchRequestBody(): (req, res, next) => void {
  return function (req, res, next): void {
    const { message, completed } = req.body;

    if (!message && (completed == null || completed == undefined)) {
      return res.status(StatusCodes.BAD_REQUEST).send('At least one field should be set.');
    }
    
    if (message === '') {
      return res.status(StatusCodes.BAD_REQUEST).send('Message can\'t be empty.');
    }

    next();
  }
}
