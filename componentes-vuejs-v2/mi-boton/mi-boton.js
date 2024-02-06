// Definir el componente Vue
Vue.component('mi-boton', {
  props: ['color', 'text', 'eventReceiver'],
  template: '<button :style="{ backgroundColor: color }" @click="onClick">{{ text }}</button>',
  methods: {
    onClick: function() {
      // Emitir un evento personalizado al hacer clic en el botón
      this.eventReceiver.$emit('clicked');
    }
  }
});
