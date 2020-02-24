const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueenSchema = new Schema({
    name: { type: String, required: true },
    govtname: { type: String, required: true },
    birthday: { type: Date, required: false },
    seasons: [{ type: Schema.Types.ObjectId, ref: "Seasons" }]
});

module.exports = mongoose.model("Queen", QueenSchema);