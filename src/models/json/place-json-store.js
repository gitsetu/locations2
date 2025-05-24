import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(collectionId, place) {
    await db.read();
    place._id = v4();
    place.collectionid = collectionId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByCollectionId(id) {
    await db.read();
    let t = db.data.places.filter((place) => place.collectionid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getPlaceById(id) {
    await db.read();
    let t = db.data.places.find((place) => place._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.title = updatedPlace.title;
    place.category = updatedPlace.category;
    place.latitude = updatedPlace.latitude;
    await db.write();
  },
};
