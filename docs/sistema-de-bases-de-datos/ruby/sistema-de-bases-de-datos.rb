require 'json'

class BaseDeDatosSimple
  def initialize(nombre_archivo)
    @nombre_archivo = nombre_archivo
    @datos = cargar_desde_archivo
  end

  private

  def cargar_desde_archivo
    if File.exist?(@nombre_archivo)
      contenido = File.read(@nombre_archivo)
      JSON.parse(contenido)
    else
      {}
    end
  end

  def guardar_en_archivo
    datos_para_escribir = JSON.pretty_generate(@datos)
    File.write(@nombre_archivo, datos_para_escribir)
  end

  public

  def obtener(clave)
    @datos[clave]
  end

  def asignar(clave, valor)
    @datos[clave] = valor
    guardar_en_archivo
  end

  def eliminar(clave)
    @datos.delete(clave)
    guardar_en_archivo
  end

  def obtener_todo
    @datos
  end
end

# Uso
base_de_datos = BaseDeDatosSimple.new('basededatos.json')

base_de_datos.asignar('usuario1', { nombre: 'Juan', edad: 30 })
base_de_datos.asignar('usuario2', { nombre: 'Ana', edad: 25 })

puts 'Usuario1:', base_de_datos.obtener('usuario1').to_json
puts 'Todos los usuarios:', base_de_datos.obtener_todo.to_json

base_de_datos.eliminar('usuario1')

puts 'Usuario1 después de eliminar:', base_de_datos.obtener('usuario1').to_json
