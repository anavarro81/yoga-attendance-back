const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const Class = require('../src/models/class.model');
const Attendance = require('../src/models/attendance.model');
const fs = require('fs');
const dotenv = require('dotenv');
const { log } = require('console');


// read the file
const param = process.argv[2];


dotenv.config({ path: './config.env' });

const BD = process.env.BD;

mongoose.connect(BD,
    {useNewUrlParser: true})
    .then(() => console.log('DB connection successful!'));


async function loadStudents() {

    const users = JSON.parse(fs.readFileSync(`${__dirname}\\users.json`, 'utf-8'));

    console.log('>> users : ', users)

    try {

        // Recuperar todas las clases
        allClasses = await Class.find();        

        if (!allClasses.length > 0 ) {
            // console.log('No hay clases en la BD. Cargalas antes de cargar los usuarios');
            console.log('\x1b[31m%s\x1b[0m', 'No hay clases en la BD. Cargalas antes de cargar los usuarios');            
            process.exit();
        }

        classesAt19 = allClasses.filter( c => c.time === "19:00");
        classesAt20 = allClasses.filter( c => c.time === "20:00");

        //Asignar clases a los usuarios. La mitad a cada clase.
        for (let i = 0; i < users.length; i++) {
            
            if (i < users.length/2 ) {
                users[i].classes_id = classesAt19;      
            } else {
                users[i].classes_id = classesAt20;
            }

            
        }
        await User.create(users);
        console.log('Students successfully loaded!');
        // Terminar el proceso, cerrando la conexión a la BD
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit();
    }
}

async function loadClasses () {

    const classes = JSON.parse(fs.readFileSync(`${__dirname}\\classes.json`, 'utf-8'));

    try {
        await Class.create(classes);
        console.log('Classes successfully loaded!');             
        
    } catch (error) {
        console.log(`Error al cargar las clases : ${error}`);
    }

}


const endProcess = () => {
    mongoose.connection.close().then(() => {
        console.log('Database connection closed.');
        process.exit();
    });
}


const loadAttendace = async () => {

    try {

        const students = await User.find();

        for (let i = 0; i < students.length; i++) {

            const student = students[i];
    
            const classes = student.classes_id;
    
            for (let j = 0; j < classes.length; j++) {
                const clase = classes[j];
    
                const attendance = {
                    user_id: student._id,
                    class_id: clase._id,
                    attendace: Math.random() >= 0.5 ? true : false
                }    
                console.log('>> attendance : ', attendance)    
                await Attendance.create(attendance);
    
        }

        console.log('>> attendance cargada correctamente ')

    
    }  


        
    } catch (error) {
        log(`Error al cargar la asistencia : ${error}`);
        process.exit();
    }
    
    
}

const deleteBD = async () => {
    try {
        await User.deleteMany();
        await Class.deleteMany();
        await Attendance.deleteMany();
        console.log('BD eliminada correctamente');
        
    } catch (error) {
        console.log(`Error al eliminar la BD : ${error}`);
        process.exit();
    }
}

const start =  async (param) => {
    if (param === 'loadAll') {
        await loadClasses();
        await loadStudents();
        await loadAttendace();
        endProcess();
    } else if (param === 'deleteAll') {
        await deleteBD();
        endProcess();
    } else {
        console.log('Parametro incorrecto');
        process.exit();
    }

    
}


start(param);