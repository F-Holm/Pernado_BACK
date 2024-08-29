  // **** Variables **** //

  const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
    'with the appropriate user keys.';


  // **** Types **** //

  export interface IPregunta {
    texto: string;
    respuesta: string;
    usuario: number;
  }


  // **** Functions **** //

  /**
   * Create new User.
   */
  function new_(
    texto?: string,
    respuesta?: string,
    usuario?: number,
  ): IPregunta {
    return {
      texto: (texto ?? ''),
      respuesta: (respuesta ?? ''),
      usuario: (usuario ?? 0),
    };
  }

  /**
   * Get user instance from object.
   */
  function from(param: object): IPregunta {
    if (!isPregunta(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IPregunta;
    return new_(p.texto, p.respuesta, p.usuario);
  }

  /**
   * See if the param meets criteria to be a user.
   */
  function isPregunta(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'texto' in arg && typeof arg.texto === 'string' &&
      'respuesta' in arg && typeof arg.respuesta === 'string' &&
      'usuario' in arg && typeof arg.usuario === 'number'
      );
  }


  // **** Export default **** //

  export default {
    new: new_,
    from,
    isPregunta,
  } as const;
