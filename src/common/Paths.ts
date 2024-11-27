/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Usuario: {
    Base: '/usuario',
    Get: '/',
    GetOne: '/:id',
    GetOneByToken: '/token/',
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
    Add: '/',
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
    GetLimitSkip: '/ls/:limit/:skip',
    GetFiltered: '/filtered/:filtro',
    GetFilteredLimitSkip: '/filteredls/:filtro/:limit/:skip',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
