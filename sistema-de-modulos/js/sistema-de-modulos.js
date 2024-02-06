// myRequire.js
class MiRequire {
  constructor() {
      this.modulos = {};
  }

  definir(nombreModulo, dependencias, factoria) {
      this.modulos[nombreModulo] = {
          dependencias: dependencias,
          factoria: factoria,
          exports: null,
          resuelto: false,
      };
  }

  requerir(nombresModulos, callback) {
      const modulosResueltos = nombresModulos.map((nombre) => this.cargarModulo(nombre));

      Promise.all(modulosResueltos).then((exportsResueltos) => {
          callback.apply(null, exportsResueltos);
      });
  }

  cargarModulo(nombreModulo) {
      const modulo = this.modulos[nombreModulo];

      if (!modulo.resuelto) {
          const exports = {};
          const dependencias = modulo.dependencias.map((dep) => this.cargarModulo(dep));

          modulo.factoria.apply(null, dependencias.concat([exports]));
          modulo.exports = exports;
          modulo.resuelto = true;
      }

      return Promise.resolve(modulo.exports);
  }
}

// Uso:
const miRequire = new MiRequire();

miRequire.definir('modulo1', [], function () {
  return {
      funcionAsincrona: function (callback) {
          setTimeout(function () {
              console.log("Función asíncrona completada en modulo1.js");
              callback();
          }, 2000);
      }
  };
});

miRequire.definir('modulo2', ['modulo1'], function (modulo1) {
  return {
      ejecutarModulo2: function () {
          console.log("Inicio de ejecución en modulo2.js");
          modulo1.funcionAsincrona(function () {
              console.log("Fin de ejecución en modulo2.js");
          });
      }
  };
});

miRequire.requerir(['modulo2'], funct
