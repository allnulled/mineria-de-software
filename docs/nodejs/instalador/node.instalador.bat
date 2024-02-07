@echo off
setlocal

rem Especifica la versión de Node.js que deseas descargar
set "NODE_VERSION=14.17.0"

rem Construye la URL de descarga basada en la versión especificada
set "DOWNLOAD_URL=https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi"

rem Nombre del archivo de salida
set "OUTPUT_FILE=nodejs-%NODE_VERSION%-x64.msi"

rem Descarga el archivo usando PowerShell
powershell -command "(New-Object System.Net.WebClient).DownloadFile('%DOWNLOAD_URL%', '%OUTPUT_FILE%')"

echo Descarga completada: %OUTPUT_FILE%
pause
