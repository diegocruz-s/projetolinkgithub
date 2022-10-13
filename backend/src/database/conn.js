// projetoplghdiego
// plghproject159

import mongoose from 'mongoose';
import 'dotenv/config';

class connect {
    constructor(){
        this.connected().catch((error)=>{
            console.log('Error DB', error); 
        });
    }

    async connected(){
        mongoose.connect(process.env.CONNECTION_DB, function(error){
            if(!error){
                return
            }
            console.log('Falha na conexão!', error);
        })
        const connection = mongoose.connection;
        connection.once('open', () => console.log('Database loaded!!')); 
         
    }
}

export default new connect();



