// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface ICaracteristicas {
  cantidadAmbientes: number;
  m2Totales: number;
  m2Cubiertos: number;
  cantidadBanios: number;
  cantidadDormitorios: number;
  cantidadToilettes: number;
  anioConstruccionRemodelacion: number;
  cantidadPlantas: number;
  cantidadGarages: number;
  cantidadElevadores: number;
  parrilla: boolean;
  pileta: boolean;
  balcon: boolean;
  patio: boolean;
  gimnasio: boolean;
  seguridad: boolean;
}


// **** Functions **** //

/**{}
 * Create new User.
 */
function new_(
  cantidadAmbientes?: number,
  m2Totales?: number,
  m2Cubiertos?: number,
  cantidadBanios?: number,
  cantidadDormitorios?: number,
  cantidadToilettes?: number,
  anioConstruccionRemodelacion?: number,
  cantidadPlantas?: number,
  cantidadGarages?: number,
  cantidadElevadores?: number,
  parrilla?: boolean,
  pileta?: boolean,
  balcon?: boolean,
  patio?: boolean,
  gimnasio?: boolean,
  seguridad?: boolean,
): ICaracteristicas {
  return {
    cantidadAmbientes: (cantidadAmbientes ?? 0),
    m2Totales: (m2Totales ?? 0),
    m2Cubiertos: (m2Cubiertos ?? 0),
    cantidadBanios: (cantidadBanios ?? 0),
    cantidadDormitorios: (cantidadDormitorios ?? 0),
    cantidadToilettes: (cantidadToilettes ?? 0),
    anioConstruccionRemodelacion: (anioConstruccionRemodelacion ?? 0),
    cantidadPlantas: (cantidadPlantas ?? 0),
    cantidadGarages: (cantidadGarages ?? 0),
    cantidadElevadores: (cantidadElevadores ?? 0),
    parrilla: (parrilla ?? false),
    pileta: (pileta ?? false),
    balcon: (balcon ?? false),
    patio: (patio ?? false),
    gimnasio: (gimnasio ?? false),
    seguridad: (seguridad ?? false),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): ICaracteristicas {
  if (!isCaracteristicas(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as ICaracteristicas;
  return new_(p.cantidadAmbientes, p.m2Totales, p.m2Cubiertos, p.cantidadBanios, p.cantidadDormitorios, p.cantidadToilettes, p.anioConstruccionRemodelacion, p.cantidadPlantas, p.cantidadGarages, p.cantidadElevadores, p.parrilla, p.pileta, p.balcon, p.patio, p.gimnasio, p.seguridad);
}

/**
 * See if the param meets criteria to be a user.
 */
function isCaracteristicas(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'cantidadAmbientes' in arg && typeof arg.cantidadAmbientes === 'number' && 
    'm2Totales' in arg && typeof arg.m2Totales === 'number' &&
    'm2Cubiertos' in arg && typeof arg.m2Cubiertos === 'number' &&
    'cantidadBanios' in arg && typeof arg.cantidadBanios === 'number' &&
    'cantidadDormitorios' in arg && typeof arg.cantidadDormitorios === 'number' &&
    'cantidadToilettes' in arg && typeof arg.cantidadToilettes === 'number' &&
    'anioConstruccionRemodelacion' in arg && typeof arg.anioConstruccionRemodelacion === 'number' &&
    'cantidadPlantas' in arg && typeof arg.cantidadPlantas === 'number' &&
    'cantidadGarages' in arg && typeof arg.cantidadGarages === 'number' &&
    'cantidadElevadores' in arg && typeof arg.cantidadElevadores === 'number' &&
    'parrilla' in arg && typeof arg.parrilla === 'boolean' &&
    'pileta' in arg && typeof arg.pileta === 'boolean' &&
    'balcon' in arg && typeof arg.balcon === 'boolean' &&
    'patio' in arg && typeof arg.patio === 'boolean' &&
    'gimnasio' in arg && typeof arg.gimnasio === 'boolean' &&
    'seguridad' in arg && typeof arg.seguridad === 'boolean'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isCaracteristicas,
} as const;
