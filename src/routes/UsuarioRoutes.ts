import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioService from '@src/services/UsuarioService';
import { IUsuario } from '@src/models/Usuario';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const usuarios = await UsuarioService.getAll();
  return res.status(HttpStatusCodes.OK).json({ usuarios });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const usuario =   await UsuarioService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ usuario });
}

/**
 * Add one user.
 */
async function add(req: IReq<{usuario: IUsuario}>, res: IRes) {
  const {usuario}  = req.body;
  await UsuarioService.addOne(usuario);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{usuario: IUsuario}>, res: IRes) {
  const { usuario } = req.body;
  await UsuarioService.updateOne(usuario);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await UsuarioService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  delete: delete_,
} as const;
