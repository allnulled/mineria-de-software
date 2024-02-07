#!/bin/bash

# Obtener la lista de direcciones IP de las interfaces de red
ip_addresses=$(ip -o addr show scope global | awk '{print $4}')

# Imprimir las direcciones IP
echo "Direcciones IP locales:"
echo "$ip_addresses"
