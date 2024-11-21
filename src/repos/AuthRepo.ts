import { Usuario } from './Conexion';
import bcrypt from 'bcrypt';
import {generateToken} from '../util/jwt';
import UsuarioRepo from './UsuarioRepo';

async function login(email: string, password: string): Promise<string>{
    const user = await UsuarioRepo.getOneEmail(email);

    console.log(user)

    if (user == null) throw new Error('Invalid credentials');
    const equals = await bcrypt.compare(password, user.contrasenia as string);

    if (equals) {
        console.log("válido")
        return generateToken(user.id);
    } else {
        console.log("inválido")
        throw new Error('Invalid credentials');
    }
}

export default {
    login
} as const;