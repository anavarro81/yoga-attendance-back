const { connect, default: mongoose } = require("mongoose");
const request = require('supertest')
const User = require('../../src/models/user.model') 
const { userRoutes } = require('../../src/routes/user.routes')
const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})
const BD = process.env.BD


describe ('Create Users', function () {
    let connection;
    // let db;
    // let User;

    // Se ejecuta antes de todos los test
    beforeAll (async () => {



        mongoose.connect(BD,{
            useNewUrlParser: true, 
        }).then ( () => console.log('Conexion correcta'))

        const app = express()
        app.use(express.json())
        app.use('/user', userRoutes)


    })


    // Se ejecuta despues de cada test
    afterAll (async () => {
        await mongoose.connection.close()
    })

    it('Inserta un usuario en la bbdd de Users', async () => {
        
        // const response = await request(app).

        

        const user = {
            name: "Antonio",
            email: "anavarro@hotmail.com",
            password: "vq4Ha!RnbQWL1rP9",
            passwordConfirm: "vq4Ha!RnbQWL1rP9"
        }

        const createData = await request(app).post('/user').send(user)
        
        expect(createData.status).toBe('success')



    })
})    

