<?php

class BaseDeDatosSimple {
    private $nombreArchivo;
    private $datos = [];

    public function __construct($nombreArchivo) {
        $this->nombreArchivo = $nombreArchivo;
        $this->cargarDesdeArchivo();
    }

    private function cargarDesdeArchivo() {
        if (file_exists($this->nombreArchivo)) {
            $contenido = file_get_contents($this->nombreArchivo);
            $this->datos = json_decode($contenido, true);
        } else {
            $this->datos = [];
        }
    }

    private function guardarEnArchivo() {
        $datosParaEscribir = json_encode($this->datos, JSON_PRETTY_PRINT);
        file_put_contents($this->nombreArchivo, $datosParaEscribir);
    }

    public function obtener($clave) {
        return isset($this->datos[$clave]) ? $this->datos[$clave] : null;
    }

    public function asignar($clave, $valor) {
        $this->datos[$clave] = $valor;
        $this->guardarEnArchivo();
    }

    public function eliminar($clave) {
        unset($this->datos[$clave]);
        $this->guardarEnArchivo();
    }

    public function obtenerTodo() {
        return $this->datos;
    }
}

// Uso
$baseDeDatos = new BaseDeDatosSimple('basededatos.json');

$baseDeDatos->asignar('usuario1', ['nombre' => 'Juan', 'edad' => 30]);
$baseDeDatos->asignar('usuario2', ['nombre' => 'Ana', 'edad' => 25]);

echo 'Usuario1: ' . json_encode($baseDeDatos->obtener('usuario1')) . PHP_EOL;
echo 'Todos los usuarios: ' . json_encode($baseDeDatos->obtenerTodo()) . PHP_EOL;

$baseDeDatos->eliminar('usuario1');

echo 'Usuario1 después de eliminar: ' . json_encode($baseDeDatos->obtener('usuario1')) . PHP_EOL;
?>
