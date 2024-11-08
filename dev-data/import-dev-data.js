const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const BD = process.env.BD;

mongoose.connect(BD,
    {useNewUrlParser: true})
    .then(() => console.log('DB connection successful!'));


async function saveBD() {

    const users = JSON.parse(fs.readFileSync(`${__dirname}\\users.json`, 'utf-8'));

    console.log('>> users : ', users)

    try {

        await User.create(users);
        console.log('Data successfully loaded!');
        // Terminar el proceso, cerrando la conexión a la BD
        process.exit();
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

saveBD();