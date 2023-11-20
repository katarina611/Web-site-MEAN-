import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Promo = new Schema({
    tip: {
        type: String
    },
    od: {
        type: Date
    },
    do: {
        type: Date
    },
    brPuta: {
        type: String
    },
    postoCene: {
        type: String
    }

})

export default mongoose.model('Promo', Promo, 'promocije');