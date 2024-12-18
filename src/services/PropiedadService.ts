import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PropiedadRepo from '@src/repos/PropiedadRepo';
import { IPropiedad } from '@src/models/Propiedad';


// **** Variables **** //

export const PROPIEDAD_NOT_FOUND_ERR = 'Propiedad no encontrada';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(): Promise<IPropiedad[]> {
  return await PropiedadRepo.getAll();
}

/**
 * Get all users.
 */
async function getCant(): Promise<number> {
  return await PropiedadRepo.getCant();
}

/**
 * get de todas las propiedades de x usuario.
 */
async function getUsuario(idUsuario: number): Promise<IPropiedad[]> {
  return await PropiedadRepo.getUsuario(idUsuario);
}

/**
 * Get all users.
 */
async function getLimitSkip(limit: number, skip: number): Promise<IPropiedad[]> {
  return await PropiedadRepo.getLimitSkip(limit, skip);
}

/**
 * Get all users.
 */
async function getFiltered(query: any): Promise<IPropiedad[]> {
  const respuesta: IPropiedad[] = await PropiedadRepo.getFiltered(query);
  /*if (respuesta.length === 0) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PROPIEDAD_NOT_FOUND_ERR,
    );
  }*/
  return respuesta;
}

/**
 * Get all users.
 */
async function getFilteredLimitSkip(query: any, limit: number, skip: number): Promise<IPropiedad[]> {
  const respuesta: IPropiedad[] = await PropiedadRepo.getFilteredLimitSkip(query, limit, skip);
  /*if (respuesta.length === 0) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PROPIEDAD_NOT_FOUND_ERR,
    );
  }*/
  return respuesta;
}

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IPropiedad> {
  const propiedad = await PropiedadRepo.getOne(id);
  if (propiedad == null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PROPIEDAD_NOT_FOUND_ERR,
    );
  }
  return propiedad;
}

/**
 * Add one user.
 */
async function addOne(propiedad: IPropiedad): Promise<void> {
  return await PropiedadRepo.add(propiedad);
}

/**
 * Update one user.
 */
async function updateOne(propiedad: IPropiedad): Promise<void> {
  const persists: boolean = await PropiedadRepo.persists(propiedad.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PROPIEDAD_NOT_FOUND_ERR,
    );
  }
  return await PropiedadRepo.update(propiedad);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  return await PropiedadRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getUsuario,
  getOne,
  getCant,
  getLimitSkip,
  getFiltered,
  getFilteredLimitSkip,
  addOne,
  updateOne,
  delete: _delete,
} as const;
