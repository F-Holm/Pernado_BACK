import fs from 'fs-extra';

function eliminarImagen(nombre: string): void {
  fs.unlink('./imagenes/' + nombre);
}

export default {
  eliminarImagen,
} as const;
