
const  mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')



const BD = process.env.BD



mongoose.connect(BD,{
    useNewUrlParser: true, 
}).then ( () => console.log('Conexion correcta'))




const port = process.env.PORT || 3000


app.listen(port, () => (console.log(`Listening on port ${port}`)))

