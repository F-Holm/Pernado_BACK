import { Router } from 'express';
import Paths from '../common/Paths';
import UsuarioRoutes from './UsuarioRoutes';
import ChatRoutes from './ChatRoutes';
import PropiedadRoutes from './PropiedadRoutes';
import AuthRoutes from './AuthRoutes';
import {verificarToken} from '@src/middleware/verificarToken';
import upload from '@src/middleware/multerImages';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

const usuarioRouter: Router = Router();
const chatRouter: Router = Router();
const propiedadRouter: Router = Router();
const authRouter: Router = Router();

// Auth
authRouter.post(
  Paths.Auth.Login,
  AuthRoutes.login,
);

// Get all users
usuarioRouter.get(
  Paths.Usuario.Get,
  verificarToken,
  UsuarioRoutes.getAll,
);

// Get one users
usuarioRouter.get(
  Paths.Usuario.GetOne,
  verificarToken,
  UsuarioRoutes.getOne,
);

// Get one users
usuarioRouter.get(
  Paths.Usuario.GetOneByToken,
  verificarToken,
  UsuarioRoutes.getOneByToken,
);

// Add one user
usuarioRouter.post(
  Paths.Usuario.Add,
  UsuarioRoutes.add,
);

// Update one user
usuarioRouter.put(
  Paths.Usuario.Update,
  verificarToken,
  UsuarioRoutes.update,
);

// Delete one user
usuarioRouter.delete(
  Paths.Usuario.Delete,
  verificarToken,
  UsuarioRoutes.delete,
);

// Get all users
chatRouter.get(
  Paths.Chat.Get,
  verificarToken,
  ChatRoutes.getAll,
);

// Get all users
chatRouter.get(
  Paths.Chat.GetMyChats,
  verificarToken,
  ChatRoutes.getMyChats,
);

// Get one users
chatRouter.get(
  Paths.Chat.GetOne,
  verificarToken,
  ChatRoutes.getOne,
);

// Add one user
chatRouter.post(
  Paths.Chat.Add,
  verificarToken,
  ChatRoutes.add,
);

// Update one user
chatRouter.put(
  Paths.Chat.Update,
  verificarToken,
  ChatRoutes.update,
);

// Delete one user
chatRouter.delete(
  Paths.Chat.Delete,
  verificarToken,
  ChatRoutes.delete,
);

// Get all users
propiedadRouter.get(
  Paths.Propiedad.Get,
  PropiedadRoutes.getAll,
);

// get de todas las propiedades de x usuario.
propiedadRouter.get(
  Paths.Propiedad.GetUsuario,
  verificarToken,
  PropiedadRoutes.getUsuario,
);

// Get all users
propiedadRouter.get(
  Paths.Propiedad.GetLimitSkip,
  PropiedadRoutes.getLimitSkip,
);

// Get all users
propiedadRouter.get(
  Paths.Propiedad.GetCant,
  PropiedadRoutes.getCant,
);

// Get all users
propiedadRouter.get(
  Paths.Propiedad.GetFiltered,
  PropiedadRoutes.getFiltered,
);

// Get all users
propiedadRouter.get(
  Paths.Propiedad.GetFilteredLimitSkip,
  PropiedadRoutes.getFilteredLimitSkip,
);

// Get one users
propiedadRouter.get(
  Paths.Propiedad.GetOne,
  PropiedadRoutes.getOne,
);

// Add one user
propiedadRouter.post(
  Paths.Propiedad.Add,
  verificarToken,
  upload.array('img', 100),
  PropiedadRoutes.add,
);

// Update one user
propiedadRouter.put(
  Paths.Propiedad.Update,
  verificarToken,
  PropiedadRoutes.update,
);

// Update one user
propiedadRouter.post(
  Paths.Propiedad.Img,
  verificarToken,
  upload.array('img', 100),
  PropiedadRoutes.postImg,
);

// Delete one user
propiedadRouter.delete(
  Paths.Propiedad.Delete,
  verificarToken,
  PropiedadRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Usuario.Base, usuarioRouter);
apiRouter.use(Paths.Chat.Base, chatRouter);
apiRouter.use(Paths.Propiedad.Base, propiedadRouter);
apiRouter.use(Paths.Auth.Base, authRouter);

// **** Export default **** //

export default apiRouter;
