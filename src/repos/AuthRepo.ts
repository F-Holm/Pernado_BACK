import { Usuario } from './Conexion';
import bcrypt from 'bcrypt';
import {generateToken} from '../util/jwt';
import UsuarioRepo from './UsuarioRepo';

async function login(email: string, password: string): Promise<string>{
    const user = await UsuarioRepo.getOneEmail(email);

    if (user == null) throw new Error('Invalid credentials');
    const equals = await bcrypt.compare(password, user.contrasenia as string);

    if (equals) {
        return generateToken(user.id);
    } else {
        throw new Error('Invalid credentials');
    }
}

export default {
    login
} as const;