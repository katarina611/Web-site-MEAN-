import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ND = new Schema({
    korIme: {
        type: String
    },
    od: {
        type: Date
    },
    do: {
        type: Date
    },
    razlog: {
        type: String
    }

})

export default mongoose.model('ND', ND, 'lekarNeRadi');