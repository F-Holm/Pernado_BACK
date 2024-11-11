import { IMensaje } from './Mensaje';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IChat {
  id: number;
  mensajes: [IMensaje];
  vendedor: number;
  comprador: number;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    mensajes?: [IMensaje],
    vendedor?: number,
    comprador?: number,
    id?: number,
    ): IChat {
    return {
        id: (id ?? -1),
        mensajes: (mensajes ?? [{} as IMensaje]),
        vendedor: (vendedor ?? 0),
        comprador: (comprador ?? 0),
    };
    };

/**
 * Get user instance from object.
 */
function from(param: object): IChat {
  if (!isChat(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IChat;
  return new_(p.mensajes, p.vendedor, p.comprador, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isChat(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    "mensajes" in arg && Array.isArray(arg.mensajes) &&
    "vendedor" in arg && typeof arg.vendedor === "number" &&
    "comprador" in arg && typeof arg.comprador === "number"
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isChat,
} as const;
