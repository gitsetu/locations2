import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(collectionId, place) {
    place._id = v4();
    place.collectionid = collectionId;
    places.push(place);
    return place;
  },

  async getPlacesByCollectionId(id) {
    return places.filter((place) => place.collectionid === id);
  },

  async getPlaceById(id) {
    let foundPlace = places.find((place) => place._id === id);
    if (!foundPlace) {
      foundPlace = null;
    }
    return foundPlace;
  },

  async getCollectionPlaces(collectionId) {
    let foundPlaces = places.filter((place) => place.collectionid === collectionId);
    if (!foundPlaces) {
      foundPlaces = null;
    }
    return foundPlaces;
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.title = updatedPlace.title;
    place.artist = updatedPlace.artist;
    place.duration = updatedPlace.duration;
  },
};
