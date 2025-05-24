import { v4 } from "uuid";

let tracks = [];

export const trackMemStore = {
  async getAllTracks() {
    return tracks;
  },

  async addTrack(collectionId, track) {
    track._id = v4();
    track.collectionid = collectionId;
    tracks.push(track);
    return track;
  },

  async getTracksByCollectionId(id) {
    return tracks.filter((track) => track.collectionid === id);
  },

  async getTrackById(id) {
    let foundTrack = tracks.find((track) => track._id === id);
    if (!foundTrack) {
      foundTrack = null;
    }
    return foundTrack;
  },

  async getCollectionTracks(collectionId) {
    let foundTracks = tracks.filter((track) => track.collectionid === collectionId);
    if (!foundTracks) {
      foundTracks = null;
    }
    return foundTracks;
  },

  async deleteTrack(id) {
    const index = tracks.findIndex((track) => track._id === id);
    if (index !== -1) tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
  },
};
