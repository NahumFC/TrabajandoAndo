/** Importando requerimientos del servidor */
const express = require('express')
const app = express()
const port = 3000

/** Configurando el servidor */
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static('HTML'));

/** Rutas */
app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.get('/perfilA', (req, res) => res.render('perfilA'))
app.get('/principalA', (req, res) => res.render('principalA'))
app.get('/perfilE', (req, res) => res.render('perfilE'))
app.get('/principalE', (req, res) => res.render('principalE'))
app.get('/administradorempleos', (req, res) => res.render('administradorempleos'))
app.get('/administradorempresa', (req, res) => res.render('administradorempresa'))
app.get('/administradorinicio', (req, res) => res.render('administradorinicio'))
app.get('/administradorsolicitantes', (req, res) => res.render('administradorsolicitantes'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))