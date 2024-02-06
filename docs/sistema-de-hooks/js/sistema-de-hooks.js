class SistemaDeHooks {
  constructor() {
      this.hooks = {};
  }

  // Método para agregar un hook
  agregarHook(nombre, callback, prioridad = 0) {
      if (!this.hooks[nombre]) {
          this.hooks[nombre] = [];
      }
      this.hooks[nombre].push({ callback, prioridad });
      // Ordenar los hooks por prioridad
      this.hooks[nombre].sort((a, b) => b.prioridad - a.prioridad);
  }

  // Método para ejecutar los hooks de forma asíncrona
  async ejecutarHooks(nombre, ...args) {
      const hooks = this.hooks[nombre] || [];
      for (const hook of hooks) {
          await hook.callback(...args);
      }
  }
}

// Ejemplo de uso:
const sistemaDeHooks = new SistemaDeHooks();

// Agregar hooks
sistemaDeHooks.agregarHook('inicio', async () => {
  console.log('Hook 1');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando operación asíncrona
});
sistemaDeHooks.agregarHook('inicio', () => console.log('Hook 2'), 1);
sistemaDeHooks.agregarHook('final', () => console.log('Hook 3'));

// Ejecutar hooks
console.log("Hooks en 'inicio':");
sistemaDeHooks.ejecutarHooks('inicio').then(() => {
  console.log("Hooks en 'final':");
  sistemaDeHooks.ejecutarHooks('final');
});

// Intentar ejecutar un hook que no existe
console.log("Hooks en 'no_existente':");
sistemaDeHooks.ejecutarHooks('no_existente').then(() => {
  console.log("Fin de ejecución");
});
