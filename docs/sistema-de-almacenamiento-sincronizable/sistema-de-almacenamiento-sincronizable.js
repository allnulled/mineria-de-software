// Definimos una clase Store para representar nuestro almacén de estado
class Store {
  constructor() {
    this.state = {
      counter: 0
    };
    this.subscriptions = [];
  }

  // Método para obtener el estado actual
  getState() {
    return this.state;
  }

  // Método para actualizar el estado
  setState(propertyPath, value) {
    let currentState = this.state;
    // Recorremos la propiedad por la ruta indicada
    for (let i = 0; i < propertyPath.length - 1; i++) {
      currentState = currentState[propertyPath[i]];
    }
    // Asignamos el nuevo valor a la propiedad indicada
    currentState[propertyPath[propertyPath.length - 1]] = value;
    this.notifySubscribers(propertyPath);
  }

  // Método para suscribirse a cambios en el estado
  subscribe(callback) {
    this.subscriptions.push(callback);
    // Devolvemos una función de limpieza para eliminar la suscripción
    return () => {
      this.subscriptions = this.subscriptions.filter(sub => sub !== callback);
    };
  }

  // Método para notificar a los suscriptores sobre cambios en el estado
  notifySubscribers(propertyPath) {
    this.subscriptions.forEach(subscription => {
      subscription(this.state, propertyPath);
    });
  }
}

// Creamos una instancia de Store
const store = new Store();

// Suscribimos una función para imprimir el estado y la ruta de la propiedad cada vez que cambie
const unsubscribe = store.subscribe((state, propertyPath) => {
  console.log('Nuevo estado:', state, 'en', propertyPath);
});

// Actualizamos el estado
store.setState(['counter'], 42);

// Cancelamos la suscripción
unsubscribe();
