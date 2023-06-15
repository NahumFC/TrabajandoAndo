/** Importando requerimientos del servidor */
const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

/** Configurando la base de datos */
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "n0m3l0",
    database: "mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

/** Configurando el servidor */
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static('HTML'));

/** Rutas */
app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.post('/login-in', (req, res) => {

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = "SELECT * FROM usuario WHERE boleta = ? AND pass = ?"
        con.query(slq, function(err, result) {

            
            
        })

      });
    
    res.render('login')

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))