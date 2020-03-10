//Creando la Aplicacion
var express = require('express')
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql')
//Es Parseando la informacion que nos dara la app a JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//El Numero de Puerto donde se mostrara la app
var port = process.env.port || 5000;
//Crear una Ruta para Mostrar nuesta Api
var router = express.Router();
app.use("/api/albunes", router);
//conexion a la BD
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'spotify',
    user: 'root',
    password: '',
});
//El query transfomado a JSON
router.get("/", function (req,res) {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("select * from temas_album", function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify({
                "status": 200,
                "response": result
            }));
        });
    });
});
//Servidor donde se ejecutara la aplicacion
app.listen(port, function () {
    console.log("Servicio ejecutandose en el puerto %d", port)
})