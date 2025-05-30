import { Place } from "./place.js";
import { Collection } from "./collection.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  async addPlace(collectionId, place) {
    place.collectionid = collectionId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByCollectionId(id) {
    const places = await Place.find({ collectionid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async deleteAllPlacesFromCollection(id) {
    await Place.deleteMany({ collectionid: id });
  },

  async updatePlace(place, updatedPlace) {
    // console.log(updatedPlace);
    const placeDoc = await Place.findOne({ _id: place._id})

    placeDoc.title = updatedPlace.title;
    placeDoc.category = updatedPlace.category;
    placeDoc.latitude = updatedPlace.latitude;
    placeDoc.longitude = updatedPlace.longitude;

    // console.log(placeDoc);
    await placeDoc.save();
  },
};
