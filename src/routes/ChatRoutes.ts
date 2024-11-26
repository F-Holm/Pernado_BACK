/* eslint-disable */
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ChatService from '@src/services/ChatService';
import Chat, { IChat } from '@src/models/Chat';
import { IReq, IRes } from './types/express/misc';
import UsuarioService from '@src/services/UsuarioService';
import Usuario from '@src/models/Usuario';

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(req: IReq, res: IRes) {
  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token))) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  const chats = await ChatService.getAll();
  return res.status(HttpStatusCodes.OK).json({ chats });
}

/**
 * Get all users.
 */
async function getMyChats(req: IReq, res: IRes) {
  const idMiembro: number = +req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && idMiembro != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  const chats: IChat[] = await ChatService.getMyChats(idMiembro);
  return res.status(HttpStatusCodes.OK).json({ chats });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  const chat = await ChatService.getOne(id);

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && !Chat.isMiembro(chat, id_token)) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  return res.status(HttpStatusCodes.OK).json({ chat });
}


/**
 * Add one user.
 */
async function add(req: IReq<{chat: IChat}>, res: IRes) {
  const { chat } = req.body;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && !Chat.isMiembro(chat, id_token)) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  await ChatService.addOne(chat);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{chat: IChat}>, res: IRes) {
  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token))) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  const { chat } = req.body;
  await ChatService.updateOne(chat);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token))) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  const id = +req.params.id;
  await ChatService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  getMyChats,
  getOne,
  update,
  delete: delete_,
} as const;
