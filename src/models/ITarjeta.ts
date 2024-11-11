import moment from 'moment';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface ITarjeta {
    numero: string;
    fechaVencimiento: Date;
    cvv: number;
    nombreCompleto: string;
    direccion: number;
    dni: number;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  numero?: string,
  fechaVencimiento?: Date,
  cvv?: number,
  nombreCompleto?: string,
  direccion?: number,
  dni?: number,
): ITarjeta {
  return {
    numero: (numero ?? ''),
    fechaVencimiento: (fechaVencimiento ? new Date(fechaVencimiento) : new Date()),
    cvv: (cvv ?? 0),
    nombreCompleto: (nombreCompleto ?? ''),
    direccion: (direccion ?? 0),
    dni: (dni ?? 0),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): ITarjeta {
  if (!isTarjeta(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as ITarjeta;
  return new_(p.numero, p.fechaVencimiento, p.cvv, p.nombreCompleto, p.direccion, p.dni);
}

/**
 * See if the param meets criteria to be a user.
 */
function isTarjeta(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'numero' in arg && typeof arg.numero === 'string' &&
    'fechaVencimiento' in arg && moment(arg.fechaVencimiento as string | Date).isValid() &&
    'cvv' in arg && typeof arg.cvv === 'number' &&
    'nombreCompleto' in arg && typeof arg.nombreCompleto === 'string' &&
    'direccion' in arg && typeof arg.direccion === 'number' &&
    'dni' in arg && typeof arg.dni === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isTarjeta,
} as const;
