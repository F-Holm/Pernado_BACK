import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PropiedadRepo from '@src/repos/PropiedadRepo';
import { IPropiedad } from '@src/models/Propiedad';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IPropiedad[]> {
  return PropiedadRepo.getAll();
}

/**
 * Get one users.
 */
function getOne(id: number): Promise<IPropiedad> {
    return PropiedadRepo.getOne(id);
  }

/**
 * Add one user.
 */
function addOne(propiedad: IPropiedad): Promise<void> {
  return PropiedadRepo.add(propiedad);
}

/**
 * Update one user.
 */
async function updateOne(propiedad: IPropiedad): Promise<void> {
  const persists = await PropiedadRepo.persists(propiedad.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return PropiedadRepo.update(propiedad);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await PropiedadRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return PropiedadRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
