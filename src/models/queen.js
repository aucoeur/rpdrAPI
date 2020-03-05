const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const populate = require('../middleware/populate')

const QueenSchema = new Schema({
    name: { type: String, required: true, unique: true },
    govtname: { type: String, required: true },
    birthdate: { type: Date, required: false },
    seasons: [{ type: Schema.Types.ObjectId, ref: "Seasons" }],
    added_by: {type: Schema.Types.ObjectId, ref: "User"}
});

QueenSchema
    // .pre('findOne', populate('seasons'))
    // .pre('find', populate('seasons'))
    .plugin(uniqueValidator);

module.exports = mongoose.model("Queen", QueenSchema);