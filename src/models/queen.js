const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const QueenSchema = new Schema({
    name: { type: String, required: true, unique: true },
    govtname: { type: String, required: true },
    birthdate: { type: Date, required: false },
    seasons: [{ type: Schema.Types.ObjectId, ref: "Season"}],
    added_by: {type: Schema.Types.ObjectId, ref: "User"}
});

QueenSchema
    .plugin(uniqueValidator);

module.exports = mongoose.model("Queen", QueenSchema);