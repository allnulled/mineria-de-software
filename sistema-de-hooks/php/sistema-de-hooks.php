class SistemaDeHooks {
    private $hooks = [];

    // Método para agregar un hook
    public function agregarHook($nombre, $callback, $prioridad = 0) {
        if (!isset($this->hooks[$nombre])) {
            $this->hooks[$nombre] = [];
        }
        $this->hooks[$nombre][] = ['callback' => $callback, 'prioridad' => $prioridad];
        // Ordenar los hooks por prioridad
        usort($this->hooks[$nombre], function($a, $b) {
            return $b['prioridad'] - $a['prioridad'];
        });
    }

    // Método para ejecutar los hooks
    public function ejecutarHooks($nombre, ...$args) {
        $hooks = $this->hooks[$nombre] ?? [];
        foreach ($hooks as $hook) {
            call_user_func_array($hook['callback'], $args);
        }
    }
}

// Ejemplo de uso:
$sistemaDeHooks = new SistemaDeHooks();

// Agregar hooks
$sistemaDeHooks->agregarHook('inicio', function() {
    echo 'Hook 1' . PHP_EOL;
}, 0);
$sistemaDeHooks->agregarHook('inicio', function() {
    echo 'Hook 2' . PHP_EOL;
}, 1);
$sistemaDeHooks->agregarHook('final', function() {
    echo 'Hook 3' . PHP_EOL;
}, 0);

// Ejecutar hooks
echo "Hooks en 'inicio':" . PHP_EOL;
$sistemaDeHooks->ejecutarHooks('inicio');
echo "Hooks en 'final':" . PHP_EOL;
$sistemaDeHooks->ejecutarHooks('final');

// Intentar ejecutar un hook que no existe
echo "Hooks en 'no_existente':" . PHP_EOL;
$sistemaDeHooks->ejecutarHooks('no_existente');
echo "Fin de ejecución" . PHP_EOL;
