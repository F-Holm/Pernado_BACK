import Propiedad, { IPropiedad } from './Propiedad';
import Tarjeta, { ITarjeta } from './ITarjeta';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface ICompra {
  propiedad: IPropiedad;
  calificacion: number;
  comentario: string;
  vendedor: number;
  tarjeta: ITarjeta;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  propiedad?: IPropiedad,
  calificacion?: number,
  comentario?: string,
  vendedor?: number,
  tarjeta?: ITarjeta
): ICompra {
  return {
    propiedad: (propiedad ?? Propiedad.new()),
    calificacion: (calificacion ?? 0),
    comentario: (comentario ?? ''),
    vendedor: (vendedor ?? 0),
    tarjeta: (tarjeta ?? Tarjeta.new()),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): ICompra {
  if (!isCompra(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as ICompra;
  return new_(p.propiedad, p.calificacion, p.comentario, p.vendedor, p.tarjeta);
}

/**
 * See if the param meets criteria to be a user.
 */
function isCompra(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'propiedad' in arg && Propiedad.isPropiedad(arg.propiedad) && 
    'calificacion' in arg && typeof arg.calificacion === 'number' &&
    'comentario' in arg && typeof arg.comentario === 'string' && 
    'vendedor' in arg && typeof arg.vendedor === 'number' &&
    'tarjeta' in arg && Tarjeta.isTarjeta(arg.tarjeta)
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isCompra,
} as const;
