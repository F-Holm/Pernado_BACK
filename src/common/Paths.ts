/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Usuario: {
    Base: '/usuario',
    Get: '/',
    GetOne: '/:id',
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
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
  Propiedad: {
    Base: '/propiedad',
    Get: '/',
    GetOne: '/:id',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
