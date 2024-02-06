class SistemaInternacionalizacion {
  constructor() {
      this.idiomas = {
          es: {
              saludo: 'Hola, mundo!',
          },
          en: {
              saludo: 'Hello, world!',
          },
      };

      this.idiomaActual = 'es';
  }

  cambiarIdioma(nuevoIdioma) {
      if (this.idiomas[nuevoIdioma]) {
          this.idiomaActual = nuevoIdioma;
          console.log(`Idioma cambiado a ${nuevoIdioma}`);
      } else {
          console.error(`El idioma ${nuevoIdioma} no está disponible`);
      }
  }

  obtenerTexto(clave, idioma = this.idiomaActual) {
      const textos = this.idiomas[idioma];

      if (textos && textos[clave]) {
          return textos[clave];
      } else {
          console.error(`La clave ${clave} no está disponible en el idioma ${idioma}`);
          return '';
      }
  }
}

// Uso
const sistemaI18n = new SistemaInternacionalizacion();
sistemaI18n.cambiarIdioma('en'); // Cambiar a inglés

const saludo = sistemaI18n.obtenerTexto('saludo');
console.log(saludo); // Output esperado: Hello, world!
