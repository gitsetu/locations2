import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCollections, testPlaces, cafe, park, forest, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {

  let cafeList = null;

  setup(async () => {
    db.init("mongo");
    await db.collectionStore.deleteAllCollections();
    await db.placeStore.deleteAllPlaces();
    cafeList = await db.collectionStore.addCollection(cafe);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(cafeList._id, testPlaces[i]);
    }
  });

  test("create single place", async () => {
    const parkList = await db.collectionStore.addCollection(park);
    const place = await db.placeStore.addPlace(parkList._id, forest)
    assert.isNotNull(place._id);
    assertSubset (forest, place);
  });

  test("create multiple placeApi", async () => {
    const places = await db.collectionStore.getCollectionById(cafeList._id);
    assert.equal(testPlaces.length, testPlaces.length)
  });

  test("delete all placeApi", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const parkList = await db.collectionStore.addCollection(park);
    const place = await db.placeStore.addPlace(parkList._id, forest)
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset (forest, newPlace);
  });

  test("delete One Place - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlace(id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCollections.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a collection - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete One User - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCollections.length);
  });
});
