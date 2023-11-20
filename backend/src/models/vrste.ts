import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Vrste = new Schema({
    naziv: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    trajanje: {
        type: Number
    },
    cena: {
        type: Number
    },
    odobren: {
        type: Boolean
    }
})

export default mongoose.model('Vrste', Vrste, 'vrstePregleda');