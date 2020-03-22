var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'smiledu',
    user: 'root',
    password: '',
});
connection.connect(function (err) {
    if (err) {
        console.log('Error de Conexion..' + err.stack);
        return;
    }
    console.log('Estas conectado felicitaciones.. Tu ID de conexion es:' + connection.threadId);
});
connection.query('select * from estudiante', function (error, results) {
    if (error)
        throw error;
    results.forEach(result => {
        console.log(result)
    });
});
connection.end();