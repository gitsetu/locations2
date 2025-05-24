import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { appService } from "./app-service.js";
import { maggie, mozart, maggieCredentials, testCollections, testTracks, concerto } from "../fixtures.js";

suite("Track API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllCollections();
    await appService.deleteAllTracks();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    mozart.userid = user._id;
    beethovenSonatas = await appService.createCollection(mozart);
  });

  teardown(async () => {});

  test("create track", async () => {
    const returnedTrack = await appService.createTrack(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedTrack);
  });

  test("create Multiple tracks", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedTracks = await appService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await appService.getTrack(returnedTracks[i]._id);
      assertSubset(track, returnedTracks[i]);
    }
  });

  test("Delete TrackApi", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    let returnedTracks = await appService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await appService.deleteTrack(returnedTracks[i]._id);
    }
    returnedTracks = await appService.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("denormalised collection", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedCollection = await appService.getCollection(beethovenSonatas._id);
    assert.equal(returnedCollection.tracks.length, testTracks.length);
    for (let i = 0; i < testTracks.length; i += 1) {
      assertSubset(testTracks[i], returnedCollection.tracks[i]);
    }
  });
});
