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

app.post('/eliminarUsuario', isLoggedIn, (req, res) => {

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");
		let sql = `DELETE FROM usuario WHERE id = ?`;
		con.query({sql, values: [req.body.id]}, function(err, result) {
			if (err) throw err;
			console.log("Usuario eliminado");
		});
		
	});

	res.redirect('/principalE');
	con.destroy();

});

app.post('/eliminarCV', isLoggedIn, (req, res) => {
	
	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");
		let sql = `DELETE FROM cv WHERE idcv = ?`;
		con.query({sql, values: [req.body.id]}, function(err, result) {
			if (err) throw err;
			console.log("CV eliminado");
		});
		
	});

	res.redirect('/principalE');
	con.destroy();

});

app.post('/eliminarOferta', isLoggedIn, (req, res) => {

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");
		let sql = `DELETE FROM oferta WHERE id = ?`;

		con.query({sql, values: [req.body.id]}, function(err, result) {
			if (err) throw err;
			console.log("Oferta eliminada");
		});

	});

	res.redirect('/principalE');
	con.destroy();

});

app.post('/agregarOferta', isLoggedIn, (req, res) => {

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");

		let sql = `INSERT INTO oferta (nombre, desc, empresa, ubicacion, sueldo, estudios, exp, idioma, edad, sexo, tipo, contacto, usuario_id) V
		VALUES (?, ?,
		?, ?
		, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		con.query({sql, values: [req.body.nombre, req.body.desc, req.body.empresa, req.body.ubicacion, req.body.sueldo, req.body.estudios, req.body.exp, req.body.idioma, req.body.edad, req.body.sexo, req.body.tipo, req.body.contacto, req.session.idUser]}, function(err, result) {
			if (err) throw err;
			console.log("Oferta agregada");
		});

	});

	res.redirect('/principalE');
	con.destroy();

});

app.post('/agregarCV', isLoggedIn, (req, res) => {

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");

		let sql = `INSERT INTO cv (desc, est_sec, est_ms, est_sup, exp_lab, usuario_id, skills) VALUES (?, ?, ?, ?, ?, ?, ?)`;

		con.query({sql, values: [req.body.desc, req.body.est_sec, req.body.est_ms, req.body.est_sup, req.body.exp_lab, req.session.idUser, req.body.skills]}, function(err, result) {
			if (err) throw err;
			console.log("CV agregado");
		});

	});

	res.redirect('/');
	con.destroy();

});

app.post('/editarCV', isLoggedIn, (req, res) => {

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");

		let sql = `UPDATE cv SET desc = ?, est_sec = ?, est_ms = ?, est_sup = ?, exp_lab = ?, skills = ? WHERE idcv = ?`;

		con.query({sql, values: [req.body.desc, req.body.est_sec, req.body.est_ms, req.body.est_sup, req.body.exp_lab, req.body.skills, req.body.id]}, function(err, result) {
			if (err) throw err;
			console.log("CV editado");
		});

	});

	res.redirect('/');
	con.destroy();

});

app.post('/editarOferta', isLoggedIn, (req, res) => {

	con.connect(async function(err) {
		if (err) throw err;
		console.log("Connected!");

		let sql = `UPDATE oferta SET nombre = ?, desc = ?, empresa = ?, ubicacion = ?, sueldo = ?, estudios = ?, exp = ?, idioma = ?, edad = ?, sexo = ?, tipo = ?, contacto = ? WHERE id = ?`;

		con.query({sql, values: [req.body.nombre, req.body.desc, req.body.empresa, req.body.ubicacion, req.body.sueldo, req.body.estudios, req.body.exp, req.body.idioma, req.body.edad, req.body.sexo, req.body.tipo, req.body.contacto, req.body.id]}, function(err, result) {
			if (err) throw err;
			console.log("Oferta editada");
		});

	});

	res.redirect('/');
	con.destroy();

});

app.post('/editarUsuario', isLoggedIn, (req, res) => {

	con.connect(async function(err) {

		if (err) throw err;
		console.log("Connected!");

		let sql = `UPDATE usuario SET boleta = ?, nombre = ?, apPat = ?, apMat = ?, email = ?, pass = ?, telefono = ?, permiso = ? WHERE id = ?`;

		con.query({sql, values: [req.body.boleta, req.body.nombre, req.body.apPat, req.body.apMat, req.body.email, req.body.pass, req.body.tel, req.body.permiso, req.body.id]}, function(err, result) {
			if (err) throw err;
			console.log("Usuario editado");
		});

	});

	res.redirect('/');
	con.destroy();

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

function traeOfertas() {

	let ofertas = [];

	con.connect(async function(err) {

		if (err) throw err;
		console.log("Connected!");
		let sql = 'SELECT * FROM oferta';
		con.query(sql, function(err, result) {
			if (err) throw err;

			
			for (let i = 0; i < result.length; i++) {

				ofertas.push({
					id: result[i].id,
					nombre: result[i].nombre,
					desc: result[i].desc,
					empresa: result[i].empresa,
					ubicacion: result[i].ubicacion,
					sueldo: result[i].sueldo,
					estudios: result[i].estudios,
					exp: result[i].exp,
					idioma: result[i].idioma,
					edad: result[i].edad,
					sexo: result[i].sexo,
					tipo: result[i].tipo,
					contacto: result[i].contacto,
					idUser: result[i].usuario_id
				});
			}


		});

	});
	
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