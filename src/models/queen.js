const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueenSchema = new Schema({
    name: { type: String, required: true },
    govtname: { type: String, required: true },
    birthday: { type: String, required: false },
    seasons: [{ type: Schema.Types.ObjectId, ref: "Seasons" }],
    // added_by: {type: Schema.Types.ObjectId, ref: "User"}
});

QueenSchema.pre("save", (next)=> {
    next()
})

module.exports = mongoose.model("Queen", QueenSchema);