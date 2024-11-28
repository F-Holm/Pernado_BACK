import * as fs from 'fs';
import * as path from 'path';

export function crearCarpetaImagenes(): void {
  const carpeta = path.join(__dirname, '../imagenes');

  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta);
  }
}

