#!/bin/bash

# Solicitar la IP de destino al usuario
read -p "Introduce la IP de destino: " target_ip

# Rango de puertos a escanear
start_port=1
end_port=65535

# Función para comprobar si un puerto está abierto
check_port() {
  port=$1
  timeout 1 bash -c "</dev/tcp/$target_ip/$port" &>/dev/null && echo "Puerto $port abierto"
}

# Escanear los puertos en el rango especificado
echo "Escaneando puertos en $target_ip..."
for (( port=start_port; port<=end_port; port++ )); do
  check_port $port &
done
wait
echo "Escaneo completo"
