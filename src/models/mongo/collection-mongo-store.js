import { Collection } from "./collection.js";
import { placeMongoStore } from "./place-mongo-store.js";
import {imageStore} from "../image-store.js";

export const collectionMongoStore = {
  async getAllCollections() {
    const collections = await Collection.find().lean();
    return collections;
  },

  async getCollectionById(id) {
    if (id) {
      const collection = await Collection.findOne({ _id: id }).lean();
      if (collection) {
        collection.places = await placeMongoStore.getPlacesByCollectionId(collection._id);
      }
      return collection;
    }
    return null;
  },

  async addCollection(collection) {
    const newCollection = new Collection(collection);
    const collectionObj = await newCollection.save();
    return this.getCollectionById(collectionObj._id);
  },

  async getUserCollections(id) {
    const collection = await Collection.find({ userid: id }).lean();
    return collection;
  },

  async deleteCollectionById(id) {
    try {
      // TODO - DONE: Cascade on Mongo DB
      // Delete all places inside collection prior to deleting the list
      await placeMongoStore.deleteAllPlacesFromCollection(id)
    } catch (error) {
      console.log("places in collection not deleted");
    }

    // TODO - DONE: delete associated image
    try {
      const collection = await this.getCollectionById(id)
      // console.log(collection.img);
      await imageStore.deleteImage(collection.img);
    } catch (error) {
      // console.log("associated image not deleted");
    }

    // finally delete collection
    try {
      await Collection.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCollections() {
    await Collection.deleteMany({});
  },

  async updateCollection(updatedCollection) {
    const collection = await Collection.findOne({ _id: updatedCollection._id });
    collection.title = updatedCollection.title;
    collection.img = updatedCollection.img;
    await collection.save();
  },
};
