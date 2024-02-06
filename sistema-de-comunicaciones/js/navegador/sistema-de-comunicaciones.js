class SistemaDeComunicaciones {
  static ajax(url, method = 'GET', headers = {}, data = null) {
      return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open(method.toUpperCase(), url);

          // Configurar encabezados
          for (const [header, value] of Object.entries(headers)) {
              request.setRequestHeader(header, value);
          }

          request.onload = () => {
              if (request.status >= 200 && request.status < 300) {
                  resolve({
                      status: request.status,
                      headers: request.getAllResponseHeaders(),
                      data: request.responseText
                  });
              } else {
                  reject(new Error(`HTTP error ${request.status}: ${request.statusText}`));
              }
          };

          request.onerror = () => {
              reject(new Error('Network error'));
          };

          request.send(data);
      });
  }
}

// Ejemplo de uso:
(async () => {
  try {
      const response = await SistemaDeComunicaciones.ajax('https://jsonplaceholder.typicode.com/posts/1', 'GET');
      console.log(response);
  } catch (error) {
      console.error('Error:', error);
  }
})();
