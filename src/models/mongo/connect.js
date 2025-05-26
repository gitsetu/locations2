import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";
import {userMongoStore} from "./user-mongo-store.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  // fixme : preparing for svelte
  db.userStore = userMongoStore;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });
}
