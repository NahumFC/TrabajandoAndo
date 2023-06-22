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

/**Objeto user */
var user = {
	id: 0,
	boleta: "",
	nombre: "",
	apPat: "",
	apMat: "",
	email: "",
	pass: "",
	tipo: "",

}

/**Cookies de sesion */
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


/** Rutas */
app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))



app.get('/principalE', isLoggedIn, (req, res) => {

		const {id, boleta, nombre, apPat, apMat, email, pass, permiso} = req.session;
		console.log(permiso);

		let users = [];
		let cv = [];

		users = traeUsers();

		cv = traeCV();

		res.render('principalE', {id, boleta, nombre, apPat, apMat, email, pass, permiso, users, cv});

	
});

app.post('/logout', isLoggedIn, (req, res) => {
	req.session.destroy();
	res.redirect('/');
})

app.post('/adduser', (req, res) => {

	con.connect(async function(err){
		if (err) throw err;

		let sql = `INSERT INTO usuario (boleta, nombre, apPat, apMat, email, pass, telefono, permiso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		con.query({sql, values: [req.body.boleta, req.body.nombre, req.body.apPat, req.body.apMat, req.body.email, req.body.pass, req.body.tel, req.body.permiso]}, function(err, result) {
			if (err) throw err;
			console.log("Usuario agregado");
		}
		)

		res.redirect('/login');

	})

})

app.post('/agregar', (req, res) => {

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `SELECT * FROM usuario WHERE boleta = ? AND pass = ?`
        con.query({sql, values: [req.body.boleta, req.body.pass]}, function(err, result) {


			if (err) throw err;

			user.id = result[0].id;
			user.boleta = result[0].boleta;
			user.nombre = result[0].nombre;
			user.apPat = result[0].apPat;
			user.apMat = result[0].apMat;
			user.email = result[0].email;
			user.pass = result[0].pass;
			user.tel = result[0].telefono;
			user.permiso = result[0].permiso;
			console.log(result[0].permiso);
			

            req.session.idUser = result[0].id;
			console.log(req.session.idUser);
			req.session.boleta = result[0].boleta;
			console.log(req.session.boleta);
			req.session.nombre = result[0].nombre;
			console.log(req.session.nombre);
			req.session.apMat = result[0].apMat;
			console.log(req.session.apMat);
			req.session.pass = result[0].pass;	
			console.log(req.session.pass);
			req.session.tel = result[0].telefono;
			console.log(req.session.tel);
			req.session.permiso = result[0].permiso;
			console.log(req.session.permiso);
			req.session.save();
			

            
        })

			

      });
    
	  
	  //res.send(req.session);
	res.redirect('/principalE');
	con.destroy()

})

function isLoggedIn(req, res, next) {
	if(req.session.id != null) {
		return next();
	}
	res.redirect('/login');
}


function traeUsers() {
	let users = [];

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");
		let sql = 'SELECT * FROM usuario';
		con.query(sql, function(err, result) {
			if (err) throw err;

			
			for (let i = 0; i < result.length; i++) {

				users.push({
					id: result[i].id,
					boleta: result[i].boleta,
					nombre: result[i].nombre,
					apPat: result[i].apPat,
					apMat: result[i].apMat,
					email: result[i].email,
					pass: result[i].pass,
					telefono: result[i].telefono,
					permiso: result[i].permiso
				});
			}


		});
		
	});
	con.destroy();

	return users;
}

function traeCV() {
	let cv = [];

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");
		let sql = 'SELECT * FROM cv';
		con.query(sql, function(err, result) {
			if (err) throw err;

			
			for (let i = 0; i < result.length; i++) {

				cv.push({
					id: result[i].idcv,
					desc: result[i].desc,
					est_sec: result[i].est_sec,
					est_ms: result[i].est_ms,
					est_sup: result[i].est_sup,
					exp_lab: result[i].exp_lab,
					idUser: result[i].usuario_id,
					skills: result[i].skills
				});
			}


		});
		
	});

	con.destroy();

	return cv;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))