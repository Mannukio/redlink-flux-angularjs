var connect = require('connect');
var serveStatic = require('serve-static');

console.log("Obteniendo contenidos estaticos del directorio " + __dirname + "\\curso-bootstrap-red-link");
console.log("Servidor corriendo en http://127.0.0.1:8098/");

connect().use(serveStatic('curso-bootstrap-red-link')).listen(8098);
