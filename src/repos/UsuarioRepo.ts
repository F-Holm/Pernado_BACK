import { IUsuario } from '@src/models/Usuario';
import { getRandomInt } from '@src/util/misc';
import { Usuario } from './Conexion';
import bcrypt from 'bcrypt';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IUsuario | null> {
  return (await Usuario.findOne({ id: id }));
}

/**
 * Get one user email.
 */
async function getOneEmail(email: string): Promise<IUsuario | null> {
  return (await Usuario.findOne({ email: email }));
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  return !!(await getOne(id));
}

/**
 * See if a user with the given email exists.
 */
async function persistsEmail(email: string): Promise<boolean> {
  return !!(await getOneEmail(email));
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUsuario[]> {
  return (await Usuario.find({}));
}

/**
 * Add one user.
 */

async function add(usuario: IUsuario): Promise<void> {
  usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, 10);
  do{
    usuario.id = getRandomInt();
  } while(await persists(usuario.id));
  await (new Usuario(usuario)).save();
}

/**
 * Update a user.
 */
async function update(usuario: IUsuario): Promise<void> {
  if(usuario.contrasenia == ''){
    usuario.contrasenia = (await getOne(usuario.id))!.contrasenia;
  }else{
    usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, 10);
  }

  await Usuario.findOneAndUpdate({ id: usuario.id }, usuario, { new: true });
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  await Usuario.findOneAndDelete({ id: id });
}


// **** Export default **** //

export default {
  getOneEmail,
  getOne,
  persists,
  persistsEmail,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
