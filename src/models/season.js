const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
    seasonNumber: { type: Number, required: true },
    premiereDate: { type: Date, required: true },
    episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
    queens: [{ type: Schema.Types.ObjectId, ref: "Queen" }]
})

module.exports = mongoose.model("Season", SeasonSchema);