import { TipoPropiedad } from './TipoPropiedad';
import Caracteristicas, { ICaracteristicas } from './Caracteristicas';
import Direccion, {IDireccion} from '@src/models/Direccion';
import Pregunta, {IPregunta} from '@src/models/Pregunta';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //

export interface IPropiedad {
  id: number;
  titulo: string;
  descripcion: string;
  duenio: number;
  precio: number;
  alquiler: boolean;
  tipoPropiedad: string;
  expensas: number;
  imagenes: string[];
  ubicacion: IDireccion;
  preguntas: IPregunta[];
  caracteristicas: ICaracteristicas;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  titulo?: string,
  descripcion?: string,
  duenio?: number,
  precio?: number,
  alquiler?: boolean,
  tipoPropiedad?: string,
  expensas?: number,
  imagenes?: string[],
  ubicacion?: IDireccion,
  preguntas?: IPregunta[],
  caracteristicas?: ICaracteristicas,
  id?: number,// id last cause usually set by db
): IPropiedad {
  return {
    id: (id ?? -1),
    titulo: (titulo ?? ''),
    descripcion: (descripcion ?? ''),
    duenio: (duenio ?? 0),
    precio: (precio ?? 0),
    alquiler: (alquiler ?? false),
    tipoPropiedad: (tipoPropiedad ?? TipoPropiedad.CASA),
    expensas: (expensas ?? 0),
    imagenes: (imagenes ?? []),
    ubicacion: (ubicacion ?? Direccion.new()),
    preguntas: (preguntas ?? []),
    caracteristicas: (caracteristicas ?? Caracteristicas.new()),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IPropiedad {
  if (!isPropiedad(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPropiedad;
  return new_(p.titulo, p.descripcion, p.duenio, p.precio, p.alquiler, p.tipoPropiedad, p.expensas, p.imagenes, p.ubicacion, p.preguntas, p.caracteristicas,p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isPropiedad(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' &&
    'titulo' in arg && typeof arg.titulo === 'string' &&
    'descripcion' in arg && typeof arg.descripcion === 'string' &&
    'duenio' in arg && typeof arg.duenio === 'object' &&
    'precio' in arg && typeof arg.precio === 'number' &&
    'alquiler' in arg && typeof arg.alquiler === 'boolean' &&
    'tipoPropiedad' in arg && typeof arg.tipoPropiedad === 'string' &&
    'expensas' in arg && typeof arg.expensas === 'number' &&
    'imagenes' in arg && Array.isArray(arg.imagenes) && arg.imagenes.every(img => typeof img === 'string') &&
    'ubicacion' in arg && Direccion.isDireccion(arg.ubicacion) &&
    'preguntas' in arg && Array.isArray(arg.preguntas) && arg.preguntas.every(preg => Pregunta.isPregunta(preg)) &&
    'caracteristicas' in arg && Caracteristicas.isCaracteristicas(arg.caracteristicas)
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isPropiedad,
} as const;
