import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Izv = new Schema({
    
    datum: {
        type: Date
    },
    vreme: {
        type: String
    },
    lekar: {
        type: String
    },
    pacijent: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    razlogDolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    narednaKontrola: {
        type: Date
    }
})

export default mongoose.model('Izv', Izv, 'izvestaji');