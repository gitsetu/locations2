import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { collectionMongoStore } from "./mongo/collection-mongo-store.js";
import { trackMongoStore } from "./mongo/track-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  collectionStore: null,
  trackStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.collectionStore = collectionJsonStore;
        this.trackStore = trackJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.collectionStore = collectionMongoStore;
        this.trackStore = trackMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.collectionStore = collectionMemStore;
        this.trackStore = trackMemStore;
    }
  }
};
