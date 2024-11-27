import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioRepo from '@src/repos/UsuarioRepo';
import { IUsuario } from '@src/models/Usuario';


// **** Variables **** //

export const USUARIO_NOT_FOUND_ERR = 'Usuario no encontrado';


// **** Functions **** //
/**
 * Get all users.
 */
async function getAll(): Promise<IUsuario[]> {
  return UsuarioRepo.getAll();
}

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IUsuario> {
  const usuario = await UsuarioRepo.getOne(id);
  if (usuario == null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USUARIO_NOT_FOUND_ERR,
    );
  }
  return usuario;
}

/**
 * Add one user.
 */
async function addOne(usuario: IUsuario): Promise<void> {
  return UsuarioRepo.add(usuario);
}

/**
 * Update one user.
 */
async function updateOne(usuario: IUsuario): Promise<void> {
  console.log('update3');
  if (!await UsuarioRepo.persists(usuario.id)) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USUARIO_NOT_FOUND_ERR,
    );
  }
  console.log('update4');
  return await UsuarioRepo.update(usuario);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  return await UsuarioRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
