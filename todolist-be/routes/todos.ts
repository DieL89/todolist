import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import {
  getTodoList,
  getById,
  createTodo,
  patchTodo,
  deleteTodo,
  getTodoListGenerator,
  getTodoPagination
} from '../services/todo-service';

import {
  renderStreamedPagedResult,
} from '../utils/rendering-helpers';

import { getQueryOptions, getPatchTodoModel } from '../utils/helpers';

import validateIdParam from '../utils/validate-id-param';
import validatePaginationParams from '../utils/validate-pagination-params';
import validatePostRequestBody from '../utils/validate-post-request-body';
import validatePatchRequestBody from '../utils/validate-patch-request-body';

import { IPagedResult, ITodoModel } from '../types/types';

const router: Router = Router();

router.get('/', validatePaginationParams(), asyncHandler(async (req, res) => {
  const todos = await getTodoList(getQueryOptions(req.query));

  res.status(StatusCodes.OK).send(todos);
}));

router.get('/stream', validatePaginationParams(), asyncHandler(async (req, res) => {
  const todoListGenerator: AsyncGenerator = getTodoListGenerator(getQueryOptions(req.query));
  const todoPagination: IPagedResult = await getTodoPagination(getQueryOptions(req.query));

  res.status(StatusCodes.OK);
  res.setHeader('Content-type', 'application/json');

  await renderStreamedPagedResult(todoListGenerator, todoPagination, (content) => res.write(content));

  res.end();
}));

router.get('/:id', validateIdParam(), asyncHandler(async (req, res) => {
  const todo = await getById(req.params.id);

  res.status(StatusCodes.OK).send(todo);
}));

router.post('/', validatePostRequestBody(), asyncHandler(async (req, res) => {
  await createTodo(req.body as ITodoModel);

  res.sendStatus(StatusCodes.CREATED);
}));

router.patch('/:id', [validateIdParam(), validatePatchRequestBody()], asyncHandler(async (req, res) => {
  await patchTodo(req.params.id, getPatchTodoModel(req.body));

  res.sendStatus(StatusCodes.NO_CONTENT);
}));

router.delete('/:id', validateIdParam(), asyncHandler(async (req, res) => {
  await deleteTodo(req.params.id);

  res.sendStatus(StatusCodes.NO_CONTENT);
}));

export default router;
