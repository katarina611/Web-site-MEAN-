import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Preg = new Schema({
    vrsta: {
        type: String
    },
    pocetak: {
        type: Date
    },
    kraj: {
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
    otkazan: {
        type: Boolean
    },
    razlog: {
        type: String
    }

})

export default mongoose.model('Preg', Preg, 'pregledi');