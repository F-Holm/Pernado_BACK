import mongoose from 'mongoose';
import schemas from './schemas';

const DB_URL: string = 'mongodb://localhost:27017/Pernado';

mongoose.connect(process.env.DATABASE || DB_URL);

export const Usuario = mongoose.model('Usuario', schemas.usuarioSchema);
export const Chat = mongoose.model('Chat', schemas.chatSchema);
export const Propiedad = mongoose.model('Propiedad', schemas.propiedadSchema);

export default {
  Usuario,
  Chat,
  Propiedad,
} as const;
