/* eslint-disable @typescript-eslint/no-unsafe-member-access,max-len */
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PropiedadService from '@src/services/PropiedadService';
import { IPropiedad } from '@src/models/Propiedad';
import { IReq, IRes } from './types/express/misc';
import Usuario from '@src/models/Usuario';
import UsuarioService from '@src/services/UsuarioService';
import ImagenesRepo from '@src/repos/ImagenesRepo';
import Pregunta, {IPregunta} from '@src/models/Pregunta';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const propiedades: IPropiedad[] = await PropiedadService.getAll();
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

  const propiedades: IPropiedad[] = await PropiedadService.getUsuario(idUsuario);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * get de todas las propiedades de x usuario.
 */
async function getUsuarioToken(req: IReq, res: IRes) {
  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id: number = JSON.parse(atob(token.split('.')[1])).data as number;

  const propiedades: IPropiedad[] = await PropiedadService.getUsuario(id);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getLimitSkip(req: IReq, res: IRes) {
  const limit: number = +req.params.limit;
  const skip: number = +req.params.skip;
  const propiedades: IPropiedad[] = await PropiedadService.getLimitSkip(limit, skip);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getFiltered(req: IReq<{ query: any }>, res: IRes) {
  const { query } = req.body;

  const propiedades: IPropiedad[] = await PropiedadService.getFiltered(query);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getFilteredLimitSkip(req: IReq<{ query: any, limit: number, skip: number }>, res: IRes) {
  const { query, limit, skip } = req.body;

  const propiedades: IPropiedad[] = await PropiedadService.getFilteredLimitSkip(query, limit, skip);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id: number =+req.params.id;
  const propiedad: IPropiedad = await PropiedadService.getOne(id);
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
 * Add one user.
 */
async function postPreguntar(req: IReq<{ pregunta: string, idPropiedad: number }>, res: IRes) {
  const { pregunta, idPropiedad } = req.body;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id: number = JSON.parse(atob(token.split('.')[1])).data as number;

  const pregunta_: IPregunta = Pregunta.new(pregunta, '', id);


  const propiedad: IPropiedad = await PropiedadService.getOne(idPropiedad);
  propiedad.preguntas.push(pregunta_);
  PropiedadService.updateOne(propiedad);
  return res.status(HttpStatusCodes.CREATED).end();
}

function postImg(req: IReq, res: IRes) {
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

  for (const imagen of (await PropiedadService.getOne(propiedad.id)).imagenes) {
    if (!propiedad.imagenes.includes(imagen)) ImagenesRepo.eliminarImagen(imagen);
  }

  await PropiedadService.updateOne(propiedad);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id: number = +req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && (await PropiedadService.getOne(id)).duenio != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  for (const imagen of (await PropiedadService.getOne(id)).imagenes) {
    ImagenesRepo.eliminarImagen(imagen);
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
  getUsuarioToken,
  getLimitSkip,
  getFiltered,
  postPreguntar,
  postImg,
  getFilteredLimitSkip,
  update,
  delete: delete_,
} as const;
