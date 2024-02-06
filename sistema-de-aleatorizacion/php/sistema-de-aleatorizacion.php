<?php

class GeneradorAleatorio {
    private $abecedario = 'abcdefghijklmnopqrstuvwxyz';
    private $vocales = 'aeiou';
    private $consonantes = 'bcdfghjklmnpqrstvwxyz';

    public function numeroAleatorio($minimo, $maximo) {
        return rand($minimo, $maximo);
    }

    public function textoAleatorio($longitud) {
        $texto = '';
        for ($i = 0; $i < $longitud; $i++) {
            $indice = $this->numeroAleatorio(0, strlen($this->abecedario) - 1);
            $texto .= $this->abecedario[$indice];
        }
        return $texto;
    }

    public function palabraAleatoria($numero) {
        $palabra = '';
        for ($i = 0; $i < $numero; $i++) {
            $consonante = $this->consonantes[$this->numeroAleatorio(0, strlen($this->consonantes) - 1)];
            $vocal = $this->vocales[$this->numeroAleatorio(0, strlen($this->vocales) - 1)];
            $palabra .= $consonante . $vocal;
        }
        return $palabra;
    }

    public function literaturaAleatoria($numero) {
        $literatura = '';
        for ($i = 0; $i < $numero; $i++) {
            $literatura .= $this->palabraAleatoria($this->numeroAleatorio(1, 5)) . ' ';
        }
        return trim($literatura);
    }

    public function fechaAleatoria($anioInicio, $anioFin) {
        $año = $this->numeroAleatorio($anioInicio, $anioFin);
        $mes = $this->numeroAleatorio(1, 12);
        $dia = $this->numeroAleatorio(1, cal_days_in_month(CAL_GREGORIAN, $mes, $año));

        $horas = $this->numeroAleatorio(0, 23);
        $minutos = $this->numeroAleatorio(0, 59);
        $segundos = $this->numeroAleatorio(0, 59);
        $milisegundos = $this->numeroAleatorio(0, 999);

        return new DateTime("$año-$mes-$dia $horas:$minutos:$segundos.$milisegundos");
    }
}

// Uso
$generador = new GeneradorAleatorio();

echo 'Número Aleatorio: ' . $generador->numeroAleatorio(1, 10) . PHP_EOL;
echo 'Texto Aleatorio: ' . $generador->textoAleatorio(8) . PHP_EOL;
echo 'Palabra Aleatoria: ' . $generador->palabraAleatoria(3) . PHP_EOL;
echo 'Literatura Aleatoria: ' . $generador->literaturaAleatoria(5) . PHP_EOL;
echo 'Fecha Aleatoria: ' . $generador->fechaAleatoria(2000, 2022)->format('Y-m-d H:i:s.u') . PHP_EOL;
?>
