import { EventEmitter } from "events";
import { assert } from "chai";
import { appService } from "./app-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, mozart, testCollections } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Collection API tests", () => {
  let user = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllCollections();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create collection", async () => {
    const returnedCollection = await appService.createCollection(mozart);
    assert.isNotNull(returnedCollection);
    assertSubset(mozart, returnedCollection);
  });

  test("delete a collection", async () => {
    const collection = await appService.createCollection(mozart);
    const response = await appService.deleteCollection(collection._id);
    assert.equal(response.status, 204);
    try {
      const returnedCollection = await appService.getCollection(collection.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Collection with this id", "Incorrect Response Message");
    }
  });

  test("create multiple collections", async () => {
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await appService.createCollection(testCollections[i]);
    }
    let returnedLists = await appService.getAllCollections();
    assert.equal(returnedLists.length, testCollections.length);
    await appService.deleteAllCollections();
    returnedLists = await appService.getAllCollections();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant collection", async () => {
    try {
      const response = await appService.deleteCollection("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Collection with this id", "Incorrect Response Message");
    }
  });
});
