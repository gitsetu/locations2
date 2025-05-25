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
    console.log(updatedPlace);

    place.title = updatedPlace.title;
    place.category = updatedPlace.category;
    place.latitude = updatedPlace.latitude;
    place.longitude = updatedPlace.longitude;

    console.log(place);
    await place.save();
  },
};
