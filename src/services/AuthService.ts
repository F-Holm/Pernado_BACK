import AuthRepo from '../repos/AuthRepo';

async function login(email: string, password: string): Promise<string>{
    try {
       return await AuthRepo.login(email, password);
    } catch (error) {
        throw error;
    }
}

export default {
    login
} as const;