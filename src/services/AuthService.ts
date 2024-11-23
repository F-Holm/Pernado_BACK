import AuthRepo from '../repos/AuthRepo';

async function login(email: string, password: string): Promise<string>{
  return await AuthRepo.login(email, password);
}

export default {
  login,
} as const;
