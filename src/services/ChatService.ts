import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ChatRepo from '@src/repos/ChatRepo';
import { IChat } from '@src/models/Chat';
import {IMensaje} from '@src/models/Mensaje';
import PropiedadRepo from '@src/repos/PropiedadRepo';


// **** Variables **** //

export const CHAT_NOT_FOUND_ERR = 'Chat no encontrado';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(): Promise<IChat[]> {
  return await ChatRepo.getAll();
}

async function getMyChats(idMiembro: number): Promise<IChat[]> {
  return await ChatRepo.getMyChats(idMiembro);
}

async function addMensaje(id: number, mensaje: IMensaje): Promise<void> {
  return await ChatRepo.addMensaje(id, mensaje);
}

/**
 * Get one users.
 */
async function getOne(id: number): Promise<IChat> {
  const chat = await ChatRepo.getOne(id);
  if (chat == null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      CHAT_NOT_FOUND_ERR,
    );
  }
  return chat;
}

/**
 * Get one users.
 */
async function tengoChat(id1: number, id2: number): Promise<boolean> {
  return await ChatRepo.tengoChat(id1, id2);
}

/**
 * Add one user.
 */
async function addOne(chat: IChat): Promise<void> {
  return await ChatRepo.add(chat);
}

/**
 * Update one user.
 */
async function updateOne(chat: IChat): Promise<void> {
  const persists : boolean = await ChatRepo.persists(chat.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      CHAT_NOT_FOUND_ERR,
    );
  }
  return ChatRepo.update(chat);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  return await ChatRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getMyChats,
  addOne,
  addMensaje,
  tengoChat,
  updateOne,
  delete: _delete,
} as const;
