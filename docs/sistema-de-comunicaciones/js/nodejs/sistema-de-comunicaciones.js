const http = require('http');
const https = require('https');
const urlModule = require('url');

class SistemaDeComunicaciones {
    static ajax(url, method = 'GET', headers = {}, data = null) {
        return new Promise((resolve, reject) => {
            const urlParsed = urlModule.parse(url);
            const options = {
                hostname: urlParsed.hostname,
                port: urlParsed.port || (urlParsed.protocol === 'https:' ? 443 : 80),
                path: urlParsed.path,
                method: method.toUpperCase(),
                headers: headers
            };

            const httpClient = urlParsed.protocol === 'https:' ? https : http;
            const request = httpClient.request(options, response => {
                let responseData = '';

                response.on('data', chunk => {
                    responseData += chunk;
                });

                response.on('end', () => {
                    resolve({
                        status: response.statusCode,
                        headers: response.headers,
                        data: responseData
                    });
                });
            });

            request.on('error', error => {
                reject(error);
            });

            if (data !== null) {
                request.write(data);
            }

            request.end();
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
