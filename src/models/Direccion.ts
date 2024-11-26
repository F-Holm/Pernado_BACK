/* eslint-disable max-len */
// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //

export interface IDireccion {
  provincia: string;
  municipio: string;
  direccion: string;
  piso_departamento: string;
  codigoPostal: number;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  provincia?: string,
  municipio?: string,
  direccion?: string,
  piso_departamento?: string,
  codigoPostal?: number,
): IDireccion {
  return {
    provincia: (provincia ?? ''),
    municipio: (municipio ?? ''),
    direccion: (direccion ?? ''),
    piso_departamento: (piso_departamento ?? ''),
    codigoPostal: (codigoPostal ?? 0),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IDireccion {
  if (!isDireccion(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IDireccion;
  return new_(p.provincia, p.municipio, p.direccion, p.piso_departamento, p.codigoPostal);
}

/**
 * See if the param meets criteria to be a user.
 */
function isDireccion(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'provincia' in arg && typeof arg.provincia === 'string' &&
    'municipio' in arg && typeof arg.municipio === 'string' &&
    'direccion' in arg && typeof arg.direccion === 'string' &&
    'piso_departamento' in arg && typeof arg.piso_departamento === 'string' &&
    'codigoPostal' in arg && typeof arg.codigoPostal === 'number'
  );
}

function dirCompleta(direccion: IDireccion): string {
  return direccion.direccion + ', ' + direccion.municipio + ', ' + direccion.provincia + ', Argentina';
}


// **** Export default **** //

export default {
  new: new_,
  from,
  dirCompleta,
  isDireccion,
} as const;
