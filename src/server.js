const express = require('express');
const app = express();
const cors = require('cors');
const _var = require('./global/_var')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/app.routes');

app.listen(_var.PORT, (err) => {
    if (err) throw err;
    console.log(`Servidor ejecutado en el puerto: http://localhos:${_var.PORT}`);
})

app.use(routes);