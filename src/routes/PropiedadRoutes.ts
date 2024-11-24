import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PropiedadService from '@src/services/PropiedadService';
import { IPropiedad } from '@src/models/Propiedad';
import { IReq, IRes } from './types/express/misc';
import FiltrosPropiedad, {
  IFiltrosPropiedad,
} from '@src/models/FiltrosPropiedad';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const propiedades = await PropiedadService.getAll();
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getLimitSkip(req: IReq<{limit: number, skip: number}>, res: IRes) {
  const { limit } = req.body;
  const { skip } = req.body;
  const propiedades = await PropiedadService.getLimitSkip(limit, skip);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getFiltered(req: IReq<{filtrosPropiedades: IFiltrosPropiedad}>, res: IRes) {
  const { filtrosPropiedades } = req.body;
  const propiedades = await PropiedadService.getFiltered(filtrosPropiedades);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getFilteredLimitSkip(req: IReq<{filtrosPropiedades: IFiltrosPropiedad, limit: number, skip: number}>, res: IRes) {
  const { filtrosPropiedades, limit, skip } = req.body;
  const propiedades = await PropiedadService.getFilteredLimitSkip(filtrosPropiedades, limit, skip);
  return res.status(HttpStatusCodes.OK).json({ propiedades });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  await PropiedadService.getOne(id);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Add one user.
 */
async function add(req: IReq<{propiedad: IPropiedad}>, res: IRes) {
  const { propiedad } = req.body;
  await PropiedadService.addOne(propiedad);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{propiedad: IPropiedad}>, res: IRes) {
  const { propiedad } = req.body;
  await PropiedadService.updateOne(propiedad);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await PropiedadService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  getOne,
  getLimitSkip,
  getFiltered,
  getFilteredLimitSkip,
  update,
  delete: delete_,
} as const;
