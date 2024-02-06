class GeneradorAleatorio
    def initialize
      @abecedario = 'abcdefghijklmnopqrstuvwxyz'
      @vocales = 'aeiou'
      @consonantes = 'bcdfghjklmnpqrstvwxyz'
    end
  
    def numero_aleatorio(minimo, maximo)
      rand(minimo..maximo)
    end
  
    def texto_aleatorio(longitud)
      texto = ''
      longitud.times { texto += @abecedario[rand(@abecedario.length)] }
      texto
    end
  
    def palabra_aleatoria(numero)
      palabra = ''
      numero.times do
        consonante = @consonantes[rand(@consonantes.length)]
        vocal = @vocales[rand(@vocales.length)]
        palabra += "#{consonante}#{vocal}"
      end
      palabra
    end
  
    def literatura_aleatoria(numero)
      literatura = ''
      numero.times { literatura += "#{palabra_aleatoria(numero_aleatorio(1, 5))} " }
      literatura.strip
    end
  
    def fecha_aleatoria(anio_inicio, anio_fin)
      año = numero_aleatorio(anio_inicio, anio_fin)
      mes = numero_aleatorio(1, 12)
      dia = numero_aleatorio(1, Date.new(año, mes, -1).day)
  
      horas = numero_aleatorio(0, 23)
      minutos = numero_aleatorio(0, 59)
      segundos = numero_aleatorio(0, 59)
      milisegundos = numero_aleatorio(0, 999)
  
      Time.new(año, mes, dia, horas, minutos, segundos, milisegundos * 1000)
    end
  end
  
  # Uso
  generador = GeneradorAleatorio.new
  
  puts 'Número Aleatorio:', generador.numero_aleatorio(1, 10)
  puts 'Texto Aleatorio:', generador.texto_aleatorio(8)
  puts 'Palabra Aleatoria:', generador.palabra_aleatoria(3)
  puts 'Literatura Aleatoria:', generador.literatura_aleatoria(5)
  puts 'Fecha Aleatoria:', generador.fecha_aleatoria(2000, 2022)
  