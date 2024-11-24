// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //

export interface IFiltrosPropiedad {
  precioMin?: number;
  precioMax?: number;
  alquiler?: boolean;
  tipoPropiedad?: string;
  expensasMin?: number;
  expensasMax?: number;
  provincia?: string;
  municipio?: string;
  cantidadAmbientesMin?: number;
  cantidadAmbientesMax?: number;
  m2TotalesMin?: number;
  m2TotalesMax?: number;
  m2CubiertosMin?: number;
  m2CubiertosMax?: number;
  cantidadBaniosMin?: number;
  cantidadBaniosMax?: number;
  cantidadDormitoriosMin?: number;
  cantidadDormitoriosMax?: number;
  cantidadToilettesMin?: number;
  cantidadToilettesMax?: number;
  anioConstruccionRemodelacionMin?: number;
  anioConstruccionRemodelacionMax?: number;
  cantidadPlantasMin?: number;
  cantidadPlantasMax?: number;
  cantidadGaragesMin?: number;
  cantidadGaragesMax?: number;
  cantidadElevadoresMin?: number;
  cantidadElevadoresMax?: number;
  parrilla?: boolean;
  pileta?: boolean;
  balcon?: boolean;
  patio?: boolean;
  gimnasio?: boolean;
  seguridad?: boolean;
}


// **** Functions **** //

/**
 * Create new FiltrosPropiedad.
 */
function new_(
  precioMin?: number,
  precioMax?: number,
  alquiler?: boolean,
  tipoPropiedad?: string,
  expensasMin?: number,
  expensasMax?: number,
  provincia?: string,
  municipio?: string,
  cantidadAmbientesMin?: number,
  cantidadAmbientesMax?: number,
  m2TotalesMin?: number,
  m2TotalesMax?: number,
  m2CubiertosMin?: number,
  m2CubiertosMax?: number,
  cantidadBaniosMin?: number,
  cantidadBaniosMax?: number,
  cantidadDormitoriosMin?: number,
  cantidadDormitoriosMax?: number,
  cantidadToilettesMin?: number,
  cantidadToilettesMax?: number,
  anioConstruccionRemodelacionMin?: number,
  anioConstruccionRemodelacionMax?: number,
  cantidadPlantasMin?: number,
  cantidadPlantasMax?: number,
  cantidadGaragesMin?: number,
  cantidadGaragesMax?: number,
  cantidadElevadoresMin?: number,
  cantidadElevadoresMax?: number,
  parrilla?: boolean,
  pileta?: boolean,
  balcon?: boolean,
  patio?: boolean,
  gimnasio?: boolean,
  seguridad?: boolean
): IFiltrosPropiedad {
  return {
    precioMin: precioMin,
    precioMax: precioMax,
    alquiler: alquiler,
    tipoPropiedad: tipoPropiedad,
    expensasMin: expensasMin,
    expensasMax: expensasMax,
    provincia: provincia,
    municipio: municipio,
    cantidadAmbientesMin: cantidadAmbientesMin,
    cantidadAmbientesMax: cantidadAmbientesMax,
    m2TotalesMin: m2TotalesMin,
    m2TotalesMax: m2TotalesMax,
    m2CubiertosMin: m2CubiertosMin,
    m2CubiertosMax: m2CubiertosMax,
    cantidadBaniosMin: cantidadBaniosMin,
    cantidadBaniosMax: cantidadBaniosMax,
    cantidadDormitoriosMin: cantidadDormitoriosMin,
    cantidadDormitoriosMax: cantidadDormitoriosMax,
    cantidadToilettesMin: cantidadToilettesMin,
    cantidadToilettesMax: cantidadToilettesMax,
    anioConstruccionRemodelacionMin: anioConstruccionRemodelacionMin,
    anioConstruccionRemodelacionMax: anioConstruccionRemodelacionMax,
    cantidadPlantasMin: cantidadPlantasMin,
    cantidadPlantasMax: cantidadPlantasMax,
    cantidadGaragesMin: cantidadGaragesMin,
    cantidadGaragesMax: cantidadGaragesMax,
    cantidadElevadoresMin: cantidadElevadoresMin,
    cantidadElevadoresMax: cantidadElevadoresMax,
    parrilla: parrilla,
    pileta: pileta,
    balcon: balcon,
    patio: patio,
    gimnasio: gimnasio,
    seguridad: seguridad,
  };
}

/**
 * Get FiltrosPropiedad instance from object.
 */
function from(param: object): IFiltrosPropiedad {
  if (!isFiltrosPropiedad(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IFiltrosPropiedad;
  return new_(
    p.precioMin, p.precioMax, p.alquiler, p.tipoPropiedad, p.expensasMin, p.expensasMax,
    p.provincia, p.municipio, p.cantidadAmbientesMin, p.cantidadAmbientesMax, p.m2TotalesMin,
    p.m2TotalesMax, p.m2CubiertosMin, p.m2CubiertosMax, p.cantidadBaniosMin, p.cantidadBaniosMax,
    p.cantidadDormitoriosMin, p.cantidadDormitoriosMax, p.cantidadToilettesMin, p.cantidadToilettesMax,
    p.anioConstruccionRemodelacionMin, p.anioConstruccionRemodelacionMax, p.cantidadPlantasMin,
    p.cantidadPlantasMax, p.cantidadGaragesMin, p.cantidadGaragesMax, p.cantidadElevadoresMin,
    p.cantidadElevadoresMax, p.parrilla, p.pileta, p.balcon, p.patio, p.gimnasio, p.seguridad,
  );
}

/**
 * See if the param meets criteria to be FiltrosPropiedad.
 */
function isFiltrosPropiedad(arg: unknown): boolean {
  if (arg && typeof arg === 'object') {
    const keys = Object.keys(arg);
    const allowedKeys = [
      'precioMin', 'precioMax', 'alquiler', 'tipoPropiedad', 'expensasMin', 'expensasMax',
      'provincia', 'municipio', 'cantidadAmbientesMin', 'cantidadAmbientesMax', 'm2TotalesMin',
      'm2TotalesMax', 'm2CubiertosMin', 'm2CubiertosMax', 'cantidadBaniosMin', 'cantidadBaniosMax',
      'cantidadDormitoriosMin', 'cantidadDormitoriosMax', 'cantidadToilettesMin', 'cantidadToilettesMax',
      'anioConstruccionRemodelacionMin', 'anioConstruccionRemodelacionMax', 'cantidadPlantasMin',
      'cantidadPlantasMax', 'cantidadGaragesMin', 'cantidadGaragesMax', 'cantidadElevadoresMin',
      'cantidadElevadoresMax', 'parrilla', 'pileta', 'balcon', 'patio', 'gimnasio', 'seguridad',
    ];

    for (const key of keys) {
      if (!allowedKeys.includes(key)) {
        return false;
      }
      const value = (arg as any)[key];
      if (
        typeof value !== 'number' &&
        typeof value !== 'boolean' &&
        typeof value !== 'string' &&
        value !== undefined
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}




// **** Export default **** //

export default {
  new: new_,
  from,
  isFiltrosPropiedad,
} as const;
