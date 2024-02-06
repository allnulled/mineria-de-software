require 'date'

class UtilidadesFecha
  def initialize
    @formato_fecha = '%d/%m/%Y %H:%M:%S.%L'
  end

  def de_texto_a_fecha(texto_fecha)
    partes_fecha = texto_fecha.scan(/\d+/).map(&:to_i)
    dia, mes, anio, hora, minutos, segundos, milisegundos = partes_fecha

    DateTime.new(anio, mes, dia, hora, minutos, segundos, milisegundos * 1000)
  end

  def de_fecha_a_texto(fecha)
    fecha.strftime(@formato_fecha)
  end
end

# Uso
utilidades_fecha = UtilidadesFecha.new

# Convertir de texto a fecha
fecha_desde_texto = utilidades_fecha.de_texto_a_fecha('01/02/2022 10:30:45.123')
puts "Fecha desde texto: #{fecha_desde_texto}"

# Convertir de fecha a texto
fecha_actual = DateTime.now
texto_desde_fecha = utilidades_fecha.de_fecha_a_texto(fecha_actual)
puts "Texto desde fecha: #{texto_desde_fecha}"
