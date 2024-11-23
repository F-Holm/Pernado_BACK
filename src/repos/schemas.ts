import mongoose from 'mongoose';

const direccionSchema = new mongoose.Schema({
  provincia: String,
  municipio: String,
  direccion: String,
  codigoPostal: Number,
});

const caracteristicasSchema = new mongoose.Schema({
  cantidadAmbientes: Number,
  m2Totales: Number,
  m2Cubiertos: Number,
  cantidadBanios: Number,
  cantidadDormitorios: Number,
  cantidadToilettes: Number,
  anioConstruccionRemodelacion: Number,
  cantidadPlantas: Number,
  cantidadGarages: Number,
  cantidadElevadores: Number,
  parrilla: Boolean,
  pileta: Boolean,
  balcon: Boolean,
  patio: Boolean,
  gimnasio: Boolean,
  seguridad: Boolean,
});

const mensajeSchema = new mongoose.Schema({
  contenido: String,
  fecha: Date,
  cliente: Boolean,
});

const chatSchema = new mongoose.Schema({
  id: Number,
  mensajes: [mensajeSchema],
  vendedor: Number,
  comprador: Number,
});

const preguntaSchema = new mongoose.Schema({
  texto: String,
  respuesta: String,
  usuario: Number,
});

const propiedadSchema = new mongoose.Schema({
  id: Number,
  titulo: String,
  descripcion: String,
  duenio: Number,
  precio: Number,
  alquiler: Boolean,
  tipoPropiedad: String,
  expensas: Number,
  imagenes: [String],
  preguntas: [preguntaSchema],
  caracteristicas: caracteristicasSchema,
});

const compraSchema = new mongoose.Schema({
  propiedad: propiedadSchema,
  calificacion: Number,
  comentario: String,
  vendedor: Number,
});

const usuarioSchema = new mongoose.Schema({
  id: Number,
  dni: Number,
  email: String,
  telefono: String,
  nombre: String,
  apellido: String,
  nombreUsuario: String,
  contrasenia: String,
  fechaNacimiento: Date,
  direccion: direccionSchema,
});

export default {
  direccionSchema,
  caracteristicasSchema,
  mensajeSchema,
  chatSchema,
  preguntaSchema,
  propiedadSchema,
  compraSchema,
  usuarioSchema,
  //tipoPropiedadSchema
} as const;
