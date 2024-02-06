const fs = require('fs');

class BaseDeDatosSimple {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.datos = {};
        this.cargarDesdeArchivo();
    }

    cargarDesdeArchivo() {
        try {
            const datos = fs.readFileSync(this.nombreArchivo, 'utf8');
            this.datos = JSON.parse(datos);
        } catch (error) {
            // Si el archivo no existe o hay un error al leerlo, simplemente inicializamos con un objeto vacío.
            this.datos = {};
        }
    }

    guardarEnArchivo() {
        const datosParaEscribir = JSON.stringify(this.datos, null, 2);
        fs.writeFileSync(this.nombreArchivo, datosParaEscribir, 'utf8');
    }

    obtener(clave) {
        return this.datos[clave];
    }

    asignar(clave, valor) {
        this.datos[clave] = valor;
        this.guardarEnArchivo();
    }

    eliminar(clave) {
        delete this.datos[clave];
        this.guardarEnArchivo();
    }

    obtenerTodo() {
        return this.datos;
    }
}

// Uso
const baseDeDatos = new BaseDeDatosSimple('basededatos.json');

baseDeDatos.asignar('usuario1', { nombre: 'Juan', edad: 30 });
baseDeDatos.asignar('usuario2', { nombre: 'Ana', edad: 25 });

console.log('Usuario1:', baseDeDatos.obtener('usuario1'));
console.log('Todos los usuarios:', baseDeDatos.obtenerTodo());

baseDeDatos.eliminar('usuario1');

console.log('Usuario1 después de eliminar:', baseDeDatos.obtener('usuario1'));
