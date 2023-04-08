import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret:string = process.env.JWT_SECRET as string;

const newToken = (data:IUser) =>
  jwt.sign({ data }, secret, {
    algorithm: 'HS256',
    expiresIn: '4d',
  });

const verifyToken = (token:string) => jwt.verify(token, secret);

export { newToken, verifyToken };
