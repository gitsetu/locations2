import {db} from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {

      const allUsers = await db.userStore.getAllUsers();
      const numUsers = allUsers.length;

      const allPlaces = await db.placeStore.getAllPlaces();
      const numPlaces = allPlaces.length;

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      const getAllPlaces = await db.placeStore.getAllPlaces();
      const uniqueValues = getAllPlaces.reduce((acc, obj) => {
        acc.add(obj[getAllPlaces.category]);
        return acc;
      }, new Set());
      const numCategories = uniqueValues.size;

      const allCollections = await db.collectionStore.getAllCollections();
      const numCollections = allCollections.length;


      const viewData = {
        title: "About App",
        num_users: numUsers,
        num_places: numPlaces,
        num_categories: numCategories,
        num_collections: numCollections,

      };
      return h.view("about-view", viewData);
    },
  },
};
