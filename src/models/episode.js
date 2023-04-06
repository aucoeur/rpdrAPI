const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    season: [{ type: Schema.Types.ObjectId, ref: "Season" }],
    episodeNumber: { type: Number, required: true },
    title: { type: String, required: true },
    airDate: { type: Date, required: false }
})

module.exports = mongoose.model("Episode", EpisodeSchema)