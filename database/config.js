const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        let db;
        if(process.env.NODE_ENV==='dev'){
            db = process.env.DB_CNN;
            await mongoose.connect(process.env.DB_CNN);
        }
        if(process.env.NODE_ENV==='test'){
            db = process.env.DB_TEST;
            await mongoose.connect(process.env.DB_TEST);
        }
        
        console.log(`DB Online: ${db}`);
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la BD');
    }
}


module.exports = {
    dbConnection,
}