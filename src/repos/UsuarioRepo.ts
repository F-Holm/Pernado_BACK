import { IUsuario } from '@src/models/Usuario';
import { getRandomInt } from '@src/util/misc';
import { Usuario } from './Conexion';
import bcrypt from 'bcrypt';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<any | null> {
  return await Usuario.findOne({ id: id });
}

/**
 * Get one user email.
 */
async function getOneEmail(email: string): Promise<any | null> {
  return await Usuario.findOne({ email: email });
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  return !!(await getOne(id));
}

/**
 * Get all users.
 */
async function getAll(): Promise<any[]> {
  return await Usuario.find({});
}


/**
 * Add one user.
 */
async function add(usuario: IUsuario): Promise<any> {
  usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, 10);
  do{
    usuario.id = getRandomInt()
  } while(await persists(usuario.id));
  return await (new Usuario(usuario)).save();
}

/**
 * Update a user.
 */
async function update(usuario: IUsuario): Promise<any> {
  do{
    const contra = await bcrypt.hash(usuario.contrasenia, 10);
    usuario.contrasenia = contra;
  }while(await persists(usuario.id));{
  return await Usuario.findOneAndUpdate({ id: usuario.id }, new Usuario(usuario), { new: true });
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<any> {
  return await Usuario.findOneAndDelete({ id: id });
}


// **** Export default **** //

export default {
  getOneEmail,
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
