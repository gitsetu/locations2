import { EventEmitter } from "events";
import { assert } from "chai";
import { appService } from "./app-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, mozart, testPlaylists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Playlist API tests", () => {
  let user = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllPlaylists();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create playlist", async () => {
    const returnedPlaylist = await appService.createPlaylist(mozart);
    assert.isNotNull(returnedPlaylist);
    assertSubset(mozart, returnedPlaylist);
  });

  test("delete a playlist", async () => {
    const playlist = await appService.createPlaylist(mozart);
    const response = await appService.deletePlaylist(playlist._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await appService.getPlaylist(playlist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple playlists", async () => {
    for (let i = 0; i < testPlaylists.length; i += 1) {
      testPlaylists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await appService.createPlaylist(testPlaylists[i]);
    }
    let returnedLists = await appService.getAllPlaylists();
    assert.equal(returnedLists.length, testPlaylists.length);
    await appService.deleteAllPlaylists();
    returnedLists = await appService.getAllPlaylists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant playlist", async () => {
    try {
      const response = await appService.deletePlaylist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });
});
