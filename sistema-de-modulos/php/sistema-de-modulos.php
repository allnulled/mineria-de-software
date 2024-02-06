<?php

class MiRequire {
    private $modulos = [];

    public function definir($nombreModulo, $dependencias, $factoria) {
        $this->modulos[$nombreModulo] = [
            'dependencias' => $dependencias,
            'factoria' => $factoria,
            'exports' => null,
            'resuelto' => false,
        ];
    }

    public function requerir($nombresModulos, $callback) {
        $modulosResueltos = array_map(function ($nombre) {
            return $this->cargarModulo($nombre);
        }, $nombresModulos);

        // Simulamos la resolución de módulos de forma asíncrona utilizando sleep
        sleep(2);

        call_user_func_array($callback, $modulosResueltos);
    }

    private function cargarModulo($nombreModulo) {
        $modulo = $this->modulos[$nombreModulo];

        if (!$modulo['resuelto']) {
            $exports = [];
            $dependencias = array_map(function ($dep) {
                return $this->cargarModulo($dep);
            }, $modulo['dependencias']);

            call_user_func_array($modulo['factoria'], array_merge($dependencias, [&$exports]));

            $modulo['exports'] = $exports;
            $modulo['resuelto'] = true;
        }

        return $modulo['exports'];
    }
}

// Uso
$miRequire = new MiRequire();

$miRequire->definir('modulo1', [], function () {
    return [
        'funcionAsincrona' => function ($callback) {
            sleep(2);
            echo "Función asíncrona completada en modulo1.php\n";
            $callback();
        },
    ];
});

$miRequire->definir('modulo2', ['modulo1'], function ($modulo1) {
    return [
        'ejecutarModulo2' => function () use ($modulo1) {
            echo "Inicio de ejecución en modulo2.php\n";
            $modulo1['funcionAsincrona'](function () {
                echo "Fin de ejecución en modulo2.php\n";
            });
        },
    ];
});

echo "Inicio del programa\n";
$miRequire->requerir(['modulo2'], function ($modulo2) {
    $modulo2['ejecutarModulo2']();
});
echo "Fin del programa\n";
?>
