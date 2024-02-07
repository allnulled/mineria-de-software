#!/bin/bash

# Especifica la versión de Node.js que deseas descargar
NODE_VERSION="14.17.0"

# Construye la URL de descarga basada en la versión especificada
DOWNLOAD_URL="https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz"

# Nombre del archivo de salida
OUTPUT_FILE="node-v$NODE_VERSION-linux-x64.tar.xz"

# Descarga el archivo usando curl
curl -o "$OUTPUT_FILE" "$DOWNLOAD_URL"

echo "Descarga completada: $OUTPUT_FILE"
