import jwt from 'jsonwebtoken';

export function generateToken(data: any): Promise<string>{
  return new Promise((resolve, reject) => {
    return jwt.sign({data}, process.env.JWT_SECRET as string, { expiresIn: '1d' }, (err, token: string | undefined) => {
      if (err) reject (err);
      if (!token)
        reject('Token not generated');
      else
        resolve(token);
    });
  });
}
