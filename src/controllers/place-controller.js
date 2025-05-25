import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placeController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const viewData = {
        title: "Edit Place",
        collection: collection,
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("place-view", { title: "Edit place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      console.log(place);

      const newPlace = {
        title: request.payload.title,
        category: request.payload.category,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.placeStore.updatePlace(place, newPlace);
      return h.redirect(`/collection/${request.params.id}`);
    },
  },
};
