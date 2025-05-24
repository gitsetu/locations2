import { userApi } from "./api/user-api.js";
import { collectionApi } from "./api/collection-api.js";
import { trackApi } from "./api/track-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/collections", config: collectionApi.create },
  { method: "DELETE", path: "/api/collections", config: collectionApi.deleteAll },
  { method: "GET", path: "/api/collections", config: collectionApi.find },
  { method: "GET", path: "/api/collections/{id}", config: collectionApi.findOne },
  { method: "DELETE", path: "/api/collections/{id}", config: collectionApi.deleteOne },

  { method: "GET", path: "/api/tracks", config: trackApi.find },
  { method: "GET", path: "/api/tracks/{id}", config: trackApi.findOne },
  { method: "POST", path: "/api/collections/{id}/tracks", config: trackApi.create },
  { method: "DELETE", path: "/api/tracks", config: trackApi.deleteAll },
  { method: "DELETE", path: "/api/tracks/{id}", config: trackApi.deleteOne },
];
