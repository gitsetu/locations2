import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  title: String,
  category: String,
  latitude: Number,
  longitude: Number,
  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
