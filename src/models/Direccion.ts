// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //

export interface IDireccion {
  provincia: string;
  municipio: string;
  direccion: string
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
  codigoPostal?: number,
): IDireccion {
  return {
    provincia: (provincia ?? ''),
    municipio: (municipio ?? ''),
    direccion: (direccion ?? ''),
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
  return new_(p.provincia, p.municipio, p.direccion, p.codigoPostal);
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
    'codigoPostal' in arg && typeof arg.codigoPostal === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isDireccion,
} as const;
