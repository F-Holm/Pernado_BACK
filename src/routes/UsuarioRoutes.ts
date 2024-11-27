/* eslint-disable max-len,@typescript-eslint/no-unsafe-member-access */
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UsuarioService from '@src/services/UsuarioService';
import Usuario, { IUsuario } from '@src/models/Usuario';
import { IReq, IRes } from './types/express/misc';


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

  const usuarios: IUsuario[] = await UsuarioService.getAll();
  return res.status(HttpStatusCodes.OK).json({ usuarios });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && id != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  const usuario: IUsuario = await UsuarioService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ usuario });
}

async function getNombreUsuario(req: IReq, res: IRes) {
  const id: number = +req.params.id;

  const usuario: IUsuario = await UsuarioService.getOne(id);
  const nombreUsuario: string = usuario.nombreUsuario;
  return res.status(HttpStatusCodes.OK).json({ nombreUsuario });

}

/**
 * Get one user.
 */
async function getOneByToken(req: IReq, res: IRes) {
  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id: number = JSON.parse(atob(token.split('.')[1])).data as number;

  const usuario: IUsuario =   await UsuarioService.getOne(id);
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
console.log('update');
  const { usuario } = req.body;
  console.log(usuario);
  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && usuario.id != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }
  console.log('update2');
  await UsuarioService.updateOne(usuario);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;

  const token: string = (req.headers['authorization'] as string).split(' ')[1];
  const id_token: number = JSON.parse(atob(token.split('.')[1])).data as number;

  if (!Usuario.isAdmin(await UsuarioService.getOne(id_token)) && id != id_token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  await UsuarioService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getNombreUsuario,
  add,
  update,
  getOneByToken,
  delete: delete_,
} as const;
