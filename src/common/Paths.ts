/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Usuario: {
    Base: '/usuario',
    Get: '/',
    GetOne: '/:id',
    GetNombreUsuario: '/nombreUsuario/:id',
    GetOneByToken: '/token',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
  Auth: {
    Base: '/auth',
    Login: '/',
  },
  Chat: {
    Base: '/chat',
    Get: '/',
    GetOne: '/:id',
    GetMyChats: '/mychats/:id',
    GetMyChatsToken: '/mychats',
    Add: '/',
    AddMensaje: '/mensaje',
    TengoChat: '/tengo/:id',
    Update: '/',
    Delete: '/:id',
  },
  Propiedad: {
    Base: '/propiedad',
    Get: '/',
    Img: '/img',
    GetOne: '/:id',
    GetCant: '/cant',
    GetUsuario: '/usuario/:id',
    GetUsuarioToken: '/usuario',
    GetLimitSkip: '/ls/:limit/:skip',
    GetFiltered: '/filtered',
    GetFilteredLimitSkip: '/filteredls',
    Add: '/',
    PostPreguntar: '/preguntar',
    Update: '/',
    Delete: '/:id',
  },
} as const;
