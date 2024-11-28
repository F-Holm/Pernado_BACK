import mongoose from 'mongoose';
import schemas from './schemas';

mongoose.connect(/*process.env.DATABASE as string*/'mongodb://localhost:27017/Pernado');

export const Usuario = mongoose.model('Usuario', schemas.usuarioSchema);
export const Chat = mongoose.model('Chat', schemas.chatSchema);
export const Propiedad = mongoose.model('Propiedad', schemas.propiedadSchema);

export default {
  Usuario,
  Chat,
  Propiedad,
} as const;
