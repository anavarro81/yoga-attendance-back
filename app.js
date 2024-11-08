const  express = require('express');
const userRoutes = require('./src/routes/user.routes');

// Para medir el rendimiento de las peticiones.
const morgan = require('morgan')

const app = express();

app.use(express.json())

console.log('process.env.NODE_ENV ', process.env.NODE_ENV);


// Solo en DESA usamos morgan con perfil = 'dev'
if (process.env.NODE_ENV == "development") {
    console.log('entro...');
    
   app.use(morgan('dev'))     
}

app.use( (req, res, next)  => {
    console.log('Entrando al middleware');
    next()
})

app.use('/user', userRoutes)

app.get('/', (req, res)=> {
    res.send('Hola mundo!!')
})

module.exports = app
