/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,max-len */
import { getRandomInt } from '@src/util/misc';
import { IPropiedad } from '@src/models/Propiedad';
import { Propiedad } from './Conexion';
import {IFiltrosPropiedad} from '@src/models/FiltrosPropiedad';

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

async function getFiltered(filtros: IFiltrosPropiedad): Promise<IPropiedad[]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (await Propiedad.find(filteredQuery(filtros)).lean() as IPropiedad[]);
}

async function getFilteredLimitSkip(filtros: IFiltrosPropiedad, limit: number, skip: number): Promise<IPropiedad[]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (await Propiedad.find(filteredQuery(filtros)).skip(skip).limit(limit).lean() as IPropiedad[]);
}

function filteredQuery(filtros: IFiltrosPropiedad): any{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (filtros.precioMin !== undefined) query.precio = { ...query.precio, $gte: filtros.precioMin };
  if (filtros.precioMax !== undefined) query.precio = { ...query.precio, $lte: filtros.precioMax };
  if (filtros.alquiler !== undefined) query.alquiler = filtros.alquiler;
  if (filtros.tipoPropiedad) query.tipoPropiedad = filtros.tipoPropiedad;
  if (filtros.expensasMin !== undefined) query.expensas = { ...query.expensas, $gte: filtros.expensasMin };
  if (filtros.expensasMax !== undefined) query.expensas = { ...query.expensas, $lte: filtros.expensasMax };
  if (filtros.provincia) query['ubicacion.provincia'] = filtros.provincia;
  if (filtros.municipio) query['ubicacion.municipio'] = filtros.municipio;
  if (filtros.cantidadAmbientesMin !== undefined) query['caracteristicas.cantidadAmbientes'] = { ...query['caracteristicas.cantidadAmbientes'], $gte: filtros.cantidadAmbientesMin };
  if (filtros.cantidadAmbientesMax !== undefined) query['caracteristicas.cantidadAmbientes'] = { ...query['caracteristicas.cantidadAmbientes'], $lte: filtros.cantidadAmbientesMax };
  if (filtros.m2TotalesMin !== undefined) query['caracteristicas.m2Totales'] = { ...query['caracteristicas.m2Totales'], $gte: filtros.m2TotalesMin };
  if (filtros.m2TotalesMax !== undefined) query['caracteristicas.m2Totales'] = { ...query['caracteristicas.m2Totales'], $lte: filtros.m2TotalesMax };
  if (filtros.m2CubiertosMin !== undefined) query['caracteristicas.m2Cubiertos'] = { ...query['caracteristicas.m2Cubiertos'], $gte: filtros.m2CubiertosMin };
  if (filtros.m2CubiertosMax !== undefined) query['caracteristicas.m2Cubiertos'] = { ...query['caracteristicas.m2Cubiertos'], $lte: filtros.m2CubiertosMax };
  if (filtros.cantidadBaniosMin !== undefined) query['caracteristicas.cantidadBanios'] = { ...query['caracteristicas.cantidadBanios'], $gte: filtros.cantidadBaniosMin };
  if (filtros.cantidadBaniosMax !== undefined) query['caracteristicas.cantidadBanios'] = { ...query['caracteristicas.cantidadBanios'], $lte: filtros.cantidadBaniosMax };
  if (filtros.cantidadDormitoriosMin !== undefined) query['caracteristicas.cantidadDormitorios'] = { ...query['caracteristicas.cantidadDormitorios'], $gte: filtros.cantidadDormitoriosMin };
  if (filtros.cantidadDormitoriosMax !== undefined) query['caracteristicas.cantidadDormitorios'] = { ...query['caracteristicas.cantidadDormitorios'], $lte: filtros.cantidadDormitoriosMax };
  if (filtros.cantidadToilettesMin !== undefined) query['caracteristicas.cantidadToilettes'] = { ...query['caracteristicas.cantidadToilettes'], $gte: filtros.cantidadToilettesMin };
  if (filtros.cantidadToilettesMax !== undefined) query['caracteristicas.cantidadToilettes'] = { ...query['caracteristicas.cantidadToilettes'], $lte: filtros.cantidadToilettesMax };
  if (filtros.anioConstruccionRemodelacionMin !== undefined) query['caracteristicas.anioConstruccionRemodelacion'] = { ...query['caracteristicas.anioConstruccionRemodelacion'], $gte: filtros.anioConstruccionRemodelacionMin };
  if (filtros.anioConstruccionRemodelacionMax !== undefined) query['caracteristicas.anioConstruccionRemodelacion'] = { ...query['caracteristicas.anioConstruccionRemodelacion'], $lte: filtros.anioConstruccionRemodelacionMax };
  if (filtros.cantidadPlantasMin !== undefined) query['caracteristicas.cantidadPlantas'] = { ...query['caracteristicas.cantidadPlantas'], $gte: filtros.cantidadPlantasMin };
  if (filtros.cantidadPlantasMax !== undefined) query['caracteristicas.cantidadPlantas'] = { ...query['caracteristicas.cantidadPlantas'], $lte: filtros.cantidadPlantasMax };
  if (filtros.cantidadGaragesMin !== undefined) query['caracteristicas.cantidadGarages'] = { ...query['caracteristicas.cantidadGarages'], $gte: filtros.cantidadGaragesMin };
  if (filtros.cantidadGaragesMax !== undefined) query['caracteristicas.cantidadGarages'] = { ...query['caracteristicas.cantidadGarages'], $lte: filtros.cantidadGaragesMax };
  if (filtros.cantidadElevadoresMin !== undefined) query['caracteristicas.cantidadElevadores'] = { ...query['caracteristicas.cantidadElevadores'], $gte: filtros.cantidadElevadoresMin };
  if (filtros.cantidadElevadoresMax !== undefined) query['caracteristicas.cantidadElevadores'] = { ...query['caracteristicas.cantidadElevadores'], $lte: filtros.cantidadElevadoresMax };
  if (filtros.parrilla !== undefined) query['caracteristicas.parrilla'] = filtros.parrilla;
  if (filtros.pileta !== undefined) query['caracteristicas.pileta'] = filtros.pileta;
  if (filtros.balcon !== undefined) query['caracteristicas.balcon'] = filtros.balcon;
  if (filtros.patio !== undefined) query['caracteristicas.patio'] = filtros.patio;
  if (filtros.gimnasio !== undefined) query['caracteristicas.gimnasio'] = filtros.gimnasio;
  if (filtros.seguridad !== undefined) query['caracteristicas.seguridad'] = filtros.seguridad;

  return query;
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
