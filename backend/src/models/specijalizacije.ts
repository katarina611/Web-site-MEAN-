import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Spec = new Schema({
    naziv: {
        type: String
    }

})

export default mongoose.model('Spec', Spec, 'specijalizacije');