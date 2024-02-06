<?php

class SistemaInternacionalizacion {
    private $idiomas = [
        'es' => [
            'saludo' => '¡Hola, mundo!',
        ],
        'en' => [
            'saludo' => 'Hello, world!',
        ],
    ];

    private $idiomaActual = 'es';

    public function cambiarIdioma($nuevoIdioma) {
        if (isset($this->idiomas[$nuevoIdioma])) {
            $this->idiomaActual = $nuevoIdioma;
            echo "Idioma cambiado a $nuevoIdioma\n";
        } else {
            echo "El idioma $nuevoIdioma no está disponible\n";
        }
    }

    public function obtenerTexto($clave, $idioma = null) {
        if ($idioma === null) {
            $idioma = $this->idiomaActual;
        }

        if (isset($this->idiomas[$idioma][$clave])) {
            return $this->idiomas[$idioma][$clave];
        } else {
            echo "La clave $clave no está disponible en el idioma $idioma\n";
            return '';
        }
    }
}

// Uso
$sistemaI18n = new SistemaInternacionalizacion();
$sistemaI18n->cambiarIdioma('en'); // Cambiar a inglés

$saludo = $sistemaI18n->obtenerTexto('saludo');
echo $saludo; // Output esperado: Hello, world!

?>
