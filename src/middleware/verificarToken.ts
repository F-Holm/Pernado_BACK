import jwt from 'jsonwebtoken';
import { Request as IReq, Response as IRes, NextFunction as INext } from 'express';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Usuario, {IUsuario} from '@src/models/Usuario';
import UsuarioRepo from '@src/repos/UsuarioRepo';


export interface Payload {
    id: number;
}
export interface CustomRequest extends IReq {
    payload: Payload;
}

export const verificarToken = (req: IReq, res:IRes, next: INext) => {
  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, usuario) => {
    if (err) return res.sendStatus(HttpStatusCodes.FORBIDDEN).json(err);
    if (usuario) {
      (req as CustomRequest).payload = usuario as Payload;
      next();
    } else {
      res.sendStatus(500);
    }
  });
};

export const isAdmin = async (req: IReq, res: IRes, next: INext) => {

  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];
  let id: number;
  let usuario: IUsuario | null;
  if(token) {
    const data = atob(token.split('.')[1]);
    id = JSON.parse(data).data as number;
    usuario = await UsuarioRepo.getOne(id);
    if (usuario != null && Usuario.isAdmin(usuario)) {
      next();
    }else {
      res.status(HttpStatusCodes.UNAUTHORIZED);
    }

  } else {
    res.status(HttpStatusCodes.UNAUTHORIZED);
  }
};
