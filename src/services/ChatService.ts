import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ChatRepo from '@src/repos/ChatRepo';
import { IChat } from '@src/models/Chat';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IChat[]> {
  return ChatRepo.getAll();
}

/**
 * Get one users.
 */
function getOne(id: number): Promise<IChat> {
    return ChatRepo.getOne(id);
  }

/**
 * Add one user.
 */
function addOne(chat: IChat): Promise<void> {
  return ChatRepo.add(chat);
}

/**
 * Update one user.
 */
async function updateOne(chat: IChat): Promise<void> {
  const persists = await ChatRepo.persists(chat.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return ChatRepo.update(chat);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await ChatRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return ChatRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
