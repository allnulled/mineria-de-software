const fs = require('fs').promises;
const path = require('path');

// Función asíncrona para recorrer recursivamente las carpetas y crear index.html
async function createIndexHTML(directory) {
  try {
    const files = await fs.readdir(directory);
    const indexPath = path.join(directory, 'index.html');
    const filesAndFolders = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const relativePath = path.relative(directory, filePath);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        filesAndFolders.push(`<li><a href="./${file}/">${file}/</a></li>`);
        await createIndexHTML(filePath); // Recursión si es un directorio
      } else {
        filesAndFolders.push(`<li><a href="./${file}">${file}</a></li>`);
      }
    }

    // Comprobar si el archivo index.html ya existe antes de crearlo
    try {
      await fs.access(indexPath);
      console.log(`El archivo index.html ya existe en ${directory}`);
    } catch (error) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Index</title>
        </head>
        <body>
          <h1>Contenido de ${directory}</h1>
          <ul>
            ${filesAndFolders.join('')}
          </ul>
        </body>
        </html>
      `;

      // Crear el archivo index.html
      await fs.writeFile(indexPath, htmlContent);
      console.log(`Se ha creado correctamente el archivo index.html en ${directory}`);
    }
  } catch (error) {
    console.error('Error al leer el directorio:', error);
  }
}

// Obtener la ruta del directorio de los argumentos del proceso
const directoryPath = process.argv[2];

// Verificar si se proporcionó una ruta
if (!directoryPath) {
  console.error('Debes proporcionar la ruta del directorio como argumento del proceso.');
} else {
  // Llamar a la función para iniciar el proceso
  createIndexHTML(directoryPath);
}
