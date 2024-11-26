import jwt from 'jsonwebtoken';
import { Request as IReq, Response as IRes, NextFunction as INext } from 'express';


export interface Payload {
    id: number;
}
export interface CustomRequest extends IReq {
    payload: Payload;
}

export const authenticateToken = (req: IReq, res:IRes, next: INext) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403).json(err);
    if (user) {
      (req as CustomRequest).payload = user as Payload;
      next();
    } else {
      res.sendStatus(500);
    }
  });
};
