import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { appService } from "./app-service.js";
import { maggie, park, maggieCredentials, testCollections, testPlaces, concerto } from "../fixtures.js";

suite("Place API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllCollections();
    await appService.deleteAllPlaces();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    park.userid = user._id;
    beethovenSonatas = await appService.createCollection(park);
  });

  teardown(async () => {});

  test("create place", async () => {
    const returnedPlace = await appService.createPlace(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedPlace);
  });

  test("create Multiple places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createPlace(beethovenSonatas._id, testPlaces[i]);
    }
    const returnedPlaces = await appService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await appService.getPlace(returnedPlaces[i]._id);
      assertSubset(place, returnedPlaces[i]);
    }
  });

  test("Delete PlaceApi", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createPlace(beethovenSonatas._id, testPlaces[i]);
    }
    let returnedPlaces = await appService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await appService.deletePlace(returnedPlaces[i]._id);
    }
    returnedPlaces = await appService.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("denormalised collection", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createPlace(beethovenSonatas._id, testPlaces[i]);
    }
    const returnedCollection = await appService.getCollection(beethovenSonatas._id);
    assert.equal(returnedCollection.places.length, testPlaces.length);
    for (let i = 0; i < testPlaces.length; i += 1) {
      assertSubset(testPlaces[i], returnedCollection.places[i]);
    }
  });
});
