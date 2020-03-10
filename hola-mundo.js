var http = require('http')
var server = http.createServer()
function mensaje(requ, resp) {
    resp.writeHead(200, { 'content-type': 'text/plain' });
    resp.write('Hola Mundo en Nodejs')
    resp.end();
}
//Enlaza la funcion con el servidor
server.on('request', mensaje);
//Node Trae dentro de su entorno un servidor de pruebas
server.listen(3000, function () {
    console.log('La Aplicacion esta funcionando en el puerto 3000')
});