import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
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
    brLicence:{
        type: Number
    },
    specijalizacija:{
        type: String
    },
    ogranak:{
        type: String
    }
})

export default mongoose.model('User', User, 'korisnici');