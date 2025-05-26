import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled
      let deleteButton = "disabled";

      const collection = await db.collectionStore.getCollectionById(request.params.id);
      try {
        const file = collection.img;
        if (file.length > 0) {
          deleteButton = ""
        }
      } catch (err) {
        console.log("no image, delete image button disabled");
      }

      const viewData = {
        title: "Collection",
        username: loggedInUser.firstName,
        collection: collection,
        delete_button: deleteButton,
      };
      return h.view("collection-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("collection-view", { title: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newPlace = {
        title: request.payload.title,
        category: request.payload.category,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.placeStore.addPlace(collection._id, newPlace);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {

      // delete existing image on database and cloudinary
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        const file = collection.img;
        // console.log("file", file);
        if (Object.keys(file).length > 0) {
          // delete image on cloudinary
          await imageStore.deleteImage(file);
          // delete img path
          collection.img = "";
          // update img path
          await db.collectionStore.updateCollection(collection);
        }
      } catch (err) {
        // console.log("error deleting image");
      }

      // upload new image
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        const file = request.payload.imagefile;
        // check image file path exist
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          collection.img = url;
          await db.collectionStore.updateCollection(collection);
        }
        return h.redirect(`/collection/${collection._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${collection._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        const file = collection.img;
        // console.log("file", file);
        if (file.length > 0) {
          // delete image on cloudinary
          await imageStore.deleteImage(file);
          // delete img path
          collection.img = "";
          // update img path
          await db.collectionStore.updateCollection(collection);
        }
        return h.redirect(`/collection/${collection._id}`);
      } catch (err) {
        // TODO DONE fix delete when there is no image
        console.log("no image");
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        return h.redirect(`/collection/${collection._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
