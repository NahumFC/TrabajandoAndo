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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))