import moment from 'moment';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IMensaje {
    contenido: string;
    fecha: Date;
    cliente:boolean;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    contenido?: string,
    fecha?: Date,
    cliente?: boolean,
    ): IMensaje {
    return {
        contenido: (contenido ?? ''),
        fecha: (fecha ?? fecha ? new Date(fecha) : new Date()),
        cliente: (cliente ?? false),
    };
}
/**
 * Get user instance from object.
 */
function from(param: object): IMensaje {
  if (!isMensaje(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IMensaje;
  return new_(p.contenido, p.fecha, p.cliente);
}

/**
 * See if the param meets criteria to be a user.
 */
function isMensaje(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'contenido' in arg && typeof arg.contenido === 'string' &&
    'fecha' in arg && moment(arg.fecha as string | Date).isValid() &&
    'cliente' in arg && typeof arg.cliente === 'boolean'
    );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isMensaje,
} as const;
