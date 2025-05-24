import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
  title: String,
  artist: String,
  duration: Number,
  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Track = Mongoose.model("Track", trackSchema);
