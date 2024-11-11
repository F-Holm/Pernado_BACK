import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioRepo from '@src/repos/UsuarioRepo';
import { IUsuario } from '@src/models/Usuario';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUsuario[]> {
  return UsuarioRepo.getAll();
}

/**
 * Get one users.
 */
function getOne(id: number): Promise<IUsuario> {
  return UsuarioRepo.getOne(id);
}

/**
 * Add one user.
 */
function addOne(usuario: IUsuario): Promise<void> {
  return UsuarioRepo.add(usuario);
}

/**
 * Update one user.
 */
async function updateOne(usuario: IUsuario): Promise<void> {
  const persists = await UsuarioRepo.persists(usuario.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UsuarioRepo.update(usuario);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UsuarioRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UsuarioRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
