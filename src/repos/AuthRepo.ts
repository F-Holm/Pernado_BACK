import {Usuario, IUsuario} from '../models/Usuario';
import bcrypt from 'bcrypt';
import {generateToken} from '../util/jwt';

async function login(email: string, password: string): Promise<string>{
    const user = await Usuario.findOne({ 
        where: { email: email }
    });
    const equals = await bcrypt.compare(password, user.contrasenia);


    if (equals) {
        return generateToken(user.idUsuario);
    } else {
        throw new Error('Invalid credentials');
    }
}

export default {
    login
} as const;