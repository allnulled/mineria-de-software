class UtilidadesDeTexto {
  static encontrarTextoEntreMarcadores(textoBase, listaMarcadores) {
      for (const marcador of listaMarcadores) {
          const inicioIndex = textoBase.indexOf(marcador.inicio);
          if (inicioIndex !== -1) {
              const finIndex = textoBase.indexOf(marcador.final, inicioIndex + marcador.inicio.length);
              if (finIndex !== -1) {
                  return textoBase.substring(inicioIndex + marcador.inicio.length, finIndex);
              }
          }
      }
      return null; // Si no se encuentra ningún texto entre marcadores
  }

  static reemplazarMarcadores(textoBase, listaMarcadores, reemplazo) {
      let textoReemplazado = textoBase;
      for (const marcador of listaMarcadores) {
          const regex = new RegExp(marcador.inicio + "(.*?)" + marcador.final, "g");
          textoReemplazado = textoReemplazado.replace(regex, reemplazo);
      }
      return textoReemplazado;
  }

  static iterarMarcadores(textoBase, listaMarcadores, funcion) {
      for (const marcador of listaMarcadores) {
          const inicioIndex = textoBase.indexOf(marcador.inicio);
          if (inicioIndex !== -1) {
              const finIndex = textoBase.indexOf(marcador.final, inicioIndex + marcador.inicio.length);
              if (finIndex !== -1) {
                  const textoMarcado = textoBase.substring(inicioIndex + marcador.inicio.length, finIndex);
                  funcion(textoMarcado);
              }
          }
      }
  }
}

// Ejemplo de uso de iterarMarcadores:
const textoBase = "Lorem ipsum dolor <inicio>sit amet, consectetur adipiscing elit.</inicio> Vestibulum <inicio>commodo ligula eu mauris</inicio> ultrices blandit. <inicio>Suspendisse</inicio> potenti. Fusce rutrum.";
const listaMarcadores = [
  { inicio: "<inicio>", final: "</inicio>" },
  { inicio: "<otroinicio>", final: "</otroinicio>" } // Puedes agregar más marcadores aquí
];

UtilidadesDeTexto.iterarMarcadores(textoBase, listaMarcadores, (textoMarcado) => {
  console.log(textoMarcado);
});
