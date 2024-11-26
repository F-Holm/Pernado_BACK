import bcrypt from 'bcrypt';
import { generateToken } from '../util/jwt';
import UsuarioRepo from './UsuarioRepo';
import {IUsuario} from '@src/models/Usuario';

async function login(email: string, password: string): Promise<string>{
  const usuario: IUsuario | null = await UsuarioRepo.getOneEmail(email);

  if (usuario == null) throw new Error('Invalid credentials');
  const equals: boolean = await bcrypt.compare(password, usuario.contrasenia);

  if (equals) {
    return generateToken(usuario.id);
  } else {
    throw new Error('Invalid credentials');
  }
}

export default {
  login,
} as const;
