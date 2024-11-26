/* eslint-disable @typescript-eslint/no-unsafe-member-access,max-len */
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PropiedadService from '@src/services/PropiedadService';
import { IPropiedad } from '@src/models/Propiedad';
import { IReq, IRes } from './types/express/misc';
import {IFiltrosPropiedad} from '@src/models/FiltrosPropiedad';
import Usuario from '@src/models/Usuario';
import UsuarioService from '@src/services/UsuarioService';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const propiedades = await PropiedadService.getAll();
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getCant(req: IReq, res: IRes) {
  const cant: number = await PropiedadService.getCant();
  return res.status(HttpStatusCodes.OK).json({ cant });
}

/**
 * get de todas las propiedades de x usuario.
 */
async function getUsuario(req: IReq, res: IRes) {
  const idUsuario: number =+req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && idUsuario != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  const propiedades = await PropiedadService.getUsuario(idUsuario);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getLimitSkip(req: IReq<{limit: number, skip: number}>, res: IRes) {
  const { limit } = req.body;
  const { skip } = req.body;
  const propiedades = await PropiedadService.getLimitSkip(limit, skip);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getFiltered(req: IReq<{filtrosPropiedades: IFiltrosPropiedad}>, res: IRes) {
  const { filtrosPropiedades } = req.body;
  const propiedades = await PropiedadService.getFiltered(filtrosPropiedades);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getFilteredLimitSkip(req: IReq<{filtrosPropiedades: IFiltrosPropiedad, limit: number, skip: number}>, res: IRes) {
  const { filtrosPropiedades, limit, skip } = req.body;
  const propiedades = await PropiedadService.getFilteredLimitSkip(filtrosPropiedades, limit, skip);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id =+req.params.id;
  const propiedad = await PropiedadService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ propiedad });
}

/**
 * Add one user.
 */
async function add(req: IReq<{propiedad: IPropiedad}>, res: IRes) {
  const { propiedad } = req.body;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token))) {
    propiedad.duenio = id_token;
  }

  await PropiedadService.addOne(propiedad);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{propiedad: IPropiedad}>, res: IRes) {
  const { propiedad } = req.body;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && propiedad.duenio != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  await PropiedadService.updateOne(propiedad);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && (await PropiedadService.getOne(id)).duenio != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  await PropiedadService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  getOne,
  getCant,
  getUsuario,
  getLimitSkip,
  getFiltered,
  getFilteredLimitSkip,
  update,
  delete: delete_,
} as const;
