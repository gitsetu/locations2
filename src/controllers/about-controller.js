import {db} from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      const allUsers = await db.userStore.getAllUsers();
      const numUsers = allUsers.length;

      const allPlaces = await db.placeStore.getAllPlaces();
      const numPlaces = allPlaces.length;

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      const getAllPlaces = await db.placeStore.getAllPlaces();

      // Count unique names
      const countUniqueNames = (arr) => new Set(arr.map(obj => obj.category.toLowerCase())).size;
      const uniqueNameCount = countUniqueNames(getAllPlaces);

      const allCollections = await db.collectionStore.getAllCollections();
      const numCollections = allCollections.length;


      const viewData = {
        title: "About App",
        username: loggedInUser.firstName,
        num_users: numUsers,
        num_places: numPlaces,
        num_categories: uniqueNameCount,
        num_collections: numCollections,

      };
      return h.view("about-view", viewData);
    },
  },
};
