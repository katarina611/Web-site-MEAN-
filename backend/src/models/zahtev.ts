import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zah = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    adresa: {
        type: String
    },
    tel: {
        type: Number
    },
    mejl: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    },
    odbijen:{
        type: Boolean
    }
})

export default mongoose.model('Zah', Zah, 'zahtevi');