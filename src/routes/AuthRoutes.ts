import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import AuthService from '@src/services/AuthService';

async function login(IReq : IReq<{email: string, contrasenia:string}>, IRes : IRes) {
    const { email, contrasenia } = IReq.body;
    try {
        const token = await AuthService.login(email, contrasenia);
        return IRes.status(HttpStatusCodes.OK).send({ token });
    }
    catch (error) {
        return IRes.status(HttpStatusCodes.UNAUTHORIZED).end();
    }
}
export default {
    login
} as const;