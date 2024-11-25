import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ChatService from '@src/services/ChatService';
import { IChat } from '@src/models/Chat';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const chats = await ChatService.getAll();
  return res.status(HttpStatusCodes.OK).json({ chats });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const chat = await ChatService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ chat });
}


/**
 * Add one user.
 */
async function add(req: IReq<{chat: IChat}>, res: IRes) {
  const { chat } = req.body;
  await ChatService.addOne(chat);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{chat: IChat}>, res: IRes) {
  const { chat } = req.body;
  await ChatService.updateOne(chat);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await ChatService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  getOne,
  update,
  delete: delete_,
} as const;
