// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //

export interface IDireccion {
  calle: string;
  numero: number;
  piso?: number;
  departamento?: string;
  provincia: string;
  ciudad: string;
  codigoPostal: number;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  calle?: string,
  numero?: number,
  piso?: number,
  departamento?: string,
  provincia?: string,
  ciudad?: string,
  codigoPostal?: number,
): IDireccion {
  return {
    calle: (calle ?? ''),
    numero: (numero ?? 0),
    piso: (piso ?? 0),
    departamento: (departamento ?? ''),
    provincia: (provincia ?? ''),
    ciudad: (ciudad ?? ''),
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
  return new_(p.calle, p.numero, p.piso, p.departamento, p.provincia, p.ciudad, p.codigoPostal);
}

/**
 * See if the param meets criteria to be a user.
 */
function isDireccion(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'calle' in arg && typeof arg.calle === 'string' &&
    'numero' in arg && typeof arg.numero === 'number' &&
    'piso' in arg && typeof arg.piso === 'number' &&
    'departamento' in arg && typeof arg.departamento === 'string' &&
    'provincia' in arg && typeof arg.provincia === 'string' &&
    'ciudad' in arg && typeof arg.ciudad === 'string' &&
    'codigoPostal' in arg && typeof arg.codigoPostal === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isDireccion,
} as const;
