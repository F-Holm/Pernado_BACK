/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,max-len */
import { getRandomInt } from '@src/util/misc';
import { IPropiedad } from '@src/models/Propiedad';
import { Propiedad } from './Conexion';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IPropiedad | null> {
  return (await Propiedad.findOne({ id: id }));
}

/**
 * Get one user.
 */
async function getCant(): Promise<number> {
  return (await Propiedad.countDocuments());
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
async function getAll(): Promise<IPropiedad[]> {
  return (await Propiedad.find({}));
}

/**
 * get de todas las propiedades de x usuario.
 */
async function getUsuario(idUsuario: number): Promise<IPropiedad[]> {
  return (await Propiedad.find({ duenio: idUsuario }));
}

/**
 * Get some users.
 */
async function getLimitSkip(limit: number, skip: number): Promise<IPropiedad[]> {
  return (await Propiedad.find({}).skip(skip).limit(limit).lean() as IPropiedad[]);
}

/**
 * Add one user.
 */
async function add(propiedad: IPropiedad): Promise<void> {
  do{
    propiedad.id = getRandomInt();
  } while(await persists(propiedad.id));
  await (new Propiedad(propiedad)).save();
}

/**
 * Update a user.
 */
async function update(propiedad: IPropiedad): Promise<void> {
  await Propiedad.findOneAndUpdate({ id: propiedad.id }, propiedad, { new: true });
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  await Propiedad.findOneAndDelete({ id: id });
}

async function getFiltered(query: any): Promise<IPropiedad[]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (await Propiedad.find(query).lean() as IPropiedad[]);
}

async function getFilteredLimitSkip(query: any, limit: number, skip: number): Promise<IPropiedad[]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (await Propiedad.find(query).skip(skip).limit(limit).lean() as IPropiedad[]);
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getUsuario,
  getAll,
  getCant,
  getLimitSkip,
  getFiltered,
  getFilteredLimitSkip,
  add,
  update,
  delete: delete_,
} as const;
