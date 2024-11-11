import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import Usuario from '@src/models/Usuario';
import Chat from '@src/models/Chat';
import Propiedad from '@src/models/Propiedad';
import UsuarioRoutes from './UsuarioRoutes';
import ChatRoutes from './ChatRoutes';
import PropiedadRoutes from './PropiedadRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const usuarioRouter = Router();
const chatRouter = Router();
const propiedadRouter = Router();

// Get all users
usuarioRouter.get(
  Paths.Usuario.Get,
  UsuarioRoutes.getAll,
);

// Get one users
usuarioRouter.get(
  Paths.Usuario.GetOne,
  UsuarioRoutes.getOne,
);

// Add one user
usuarioRouter.post(
  Paths.Usuario.Add,
  UsuarioRoutes.add,
);

// Update one user
usuarioRouter.put(
  Paths.Usuario.Update,
  UsuarioRoutes.update,
);

// Delete one user
usuarioRouter.delete(
  Paths.Usuario.Delete,
  UsuarioRoutes.delete,
);

// Get all users
chatRouter.get(
  Paths.Chat.Get,
  ChatRoutes.getAll,
);

// Get one users
chatRouter.get(
  Paths.Chat.GetOne,
  ChatRoutes.getOne,
);

// Add one user
chatRouter.post(
  Paths.Chat.Add,
  validate(['chat', Chat.isChat]),
  ChatRoutes.add,
);

// Update one user
chatRouter.put(
  Paths.Chat.Update,
  validate(['chat', Chat.isChat]),
  ChatRoutes.update,
);

// Delete one user
chatRouter.delete(
  Paths.Chat.Delete,
  validate(['id', 'number', 'params']),
  ChatRoutes.delete,
);

// Get all users
propiedadRouter.get(
  Paths.Propiedad.Get,
  PropiedadRoutes.getAll,
);

// Get one users
propiedadRouter.get(
  Paths.Propiedad.GetOne,
  PropiedadRoutes.getOne,
);

// Add one user
propiedadRouter.post(
  Paths.Propiedad.Add,
  validate(['propiedad', Propiedad.isPropiedad]),
  PropiedadRoutes.add,
);

// Update one user
propiedadRouter.put(
  Paths.Propiedad.Update,
  validate(['propiedad', Propiedad.isPropiedad]),
  PropiedadRoutes.update,
);

// Delete one user
propiedadRouter.delete(
  Paths.Propiedad.Delete,
  validate(['id', 'number', 'params']),
  PropiedadRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Usuario.Base, usuarioRouter);
apiRouter.use(Paths.Chat.Base, chatRouter);
apiRouter.use(Paths.Propiedad.Base, propiedadRouter);

// **** Export default **** //

export default apiRouter;
