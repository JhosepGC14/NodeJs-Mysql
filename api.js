//Creando la Aplicacion
var express = require('express')
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql')


//El Numero de Puerto donde se mostrara la app
var port = process.env.port || 5000;

//Crear una Ruta para Mostrar nuesta Api
// var router = express.Router();
// app.use("/api/estudiante", router);

//conexion a la BD
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'smiledu',
    user: 'root',
    password: '',
});

connection.connect(function (err) {
    if (err) throw err
    console.log("Conectado con exito")
})

//Es Parseando la informacion que nos dara la app a JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Mostrar todos los Servicios = ENDPOINT
app.get("/estudiante", function (req, res) {
    connection.query("select * from estudiante", function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": result
        }));
    });
});

//MOstrar los servicios por ID = ENDPOINT
app.get('/estudiante/:id', function (req, res) {
    connection.query("select * from estudiante where id_estu=?", [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

//POST insertar nuevos datos a la tabla de BD
app.post('/estudiante', function (req, res) {
    var params = req.body;
    console.log(params);
    connection.query("insert into estudiante set ?", params, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

//PUT acutaliza datos de la tabla en la BD
app.put('/estudiante', function (req, res) {
    var params = req.body;
    connection.query("update estudiante set nom_estudiante=? ,ape_paterno=?,ape_materno=?,correo=?,fecha_nac=?,sexo=?,nivel=? where id_estu=?",
        [req.body.nombre, req.body.apepaterno, req.body.apematerno, req.body.correo, req.body.fecha, req.body.sexo, req.body.nivel, req.body.idestu]
        , function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
});

//DELETE borrar datos dela tale de la BD
//Eliminar Servicios en la tabla ENDPOINT
app.delete('/estudiante', function (req, res) {
    connection.query("delete from estudiante where id_estu=?", [req.body.idestu]
        , function (error, results, fields) {
            if (error) throw error;
            res.end('REGISTRO ELIMINADO CORRECTAMENTE');
        });
});

//Servidor donde se ejecutara la aplicacion
app.listen(port, function () {
    console.log("Servicio ejecutandose en el puerto %d", port)
})