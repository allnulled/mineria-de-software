<?php

class UtilidadesFecha {
    private $formatoFecha = 'd/m/Y H:i:s.u';

    public function deTextoAFecha($textoFecha) {
        $partesFecha = preg_split("/[\s\/:.]+/", $textoFecha);
        list($dia, $mes, $anio, $hora, $minutos, $segundos, $milisegundos) = array_map('intval', $partesFecha);

        return new DateTime("$anio-$mes-$dia $hora:$minutos:$segundos.$milisegundos");
    }

    public function deFechaATexto($fecha) {
        return $fecha->format($this->formatoFecha);
    }
}

// Uso
$utilidadesFecha = new UtilidadesFecha();

// Convertir de texto a fecha
$fechaDesdeTexto = $utilidadesFecha->deTextoAFecha('01/02/2022 10:30:45.123');
echo 'Fecha desde texto: ' . $fechaDesdeTexto->format('Y-m-d H:i:s.u') . PHP_EOL;

// Convertir de fecha a texto
$fechaActual = new DateTime();
$textoDesdeFecha = $utilidadesFecha->deFechaATexto($fechaActual);
echo 'Texto desde fecha: ' . $textoDesdeFecha . PHP_EOL;
?>
