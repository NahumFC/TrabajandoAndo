/** Importando requerimientos del servidor */
const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')

/** Configurando la base de datos */
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "n0m3l0",
    database: "mydb"
  });
  

/** Configurando el servidor */
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static('HTML'));
app.use(bodyParser.urlencoded({extended : true}));

/**Cookies de sesion */
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/** Rutas */
app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.post('/agregar', (req, res) => {

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `SELECT * FROM usuario WHERE boleta = ? AND pass = ?`
        con.query({sql, values: [req.body.boleta, req.body.pass]}, function(err, result) {

			if (err) {

				console.log(err)
				throw err
			};
			console.log(result)

            req.session.idUser = result[0].id;
			req.session.boleta = result[0].boleta;
			req.session.nombre = result[0].nombre;
			req.session.apellido = result[0].apellido;
			req.session.email = result[0].email;
			req.session.pass = result[0].pass;	
			req.session.tipo = result[0].tipo;
			req.session.foto = result[0].foto;
			req.session.save();
			res.send(result[0]);
			res.redirect('/principalE');

            
        })

      });
    
    res.render('login')

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))