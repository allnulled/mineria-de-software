class SistemaInternacionalizacion
    def initialize
      @idiomas = {
        'es' => {
          'saludo' => '¡Hola, mundo!'
        },
        'en' => {
          'saludo' => 'Hello, world!'
        }
      }
      @idioma_actual = 'es'
    end
  
    def cambiar_idioma(nuevo_idioma)
      if @idiomas.key?(nuevo_idioma)
        @idioma_actual = nuevo_idioma
        puts "Idioma cambiado a #{nuevo_idioma}"
      else
        puts "El idioma #{nuevo_idioma} no está disponible"
      end
    end
  
    def obtener_texto(clave, idioma = nil)
      idioma ||= @idioma_actual
  
      if @idiomas[idioma] && @idiomas[idioma][clave]
        @idiomas[idioma][clave]
      else
        puts "La clave #{clave} no está disponible en el idioma #{idioma}"
        ''
      end
    end
  end
  
  # Uso
  sistema_i18n = SistemaInternacionalizacion.new
  sistema_i18n.cambiar_idioma('en') # Cambiar a inglés
  
  saludo = sistema_i18n.obtener_texto('saludo')
  puts saludo # Output esperado: Hello, world!
  