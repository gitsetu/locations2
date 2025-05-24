import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const appService = {
  appUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.appUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.appUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.appUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.appUrl}/api/users`);
    return res.data;
  },

  async createCollection(collection) {
    const res = await axios.post(`${this.appUrl}/api/collections`, collection);
    return res.data;
  },

  async deleteAllCollections() {
    const response = await axios.delete(`${this.appUrl}/api/collections`);
    return response.data;
  },

  async deleteCollection(id) {
    const response = await axios.delete(`${this.appUrl}/api/collections/${id}`);
    return response;
  },

  async getAllCollections() {
    const res = await axios.get(`${this.appUrl}/api/collections`);
    return res.data;
  },

  async getCollection(id) {
    const res = await axios.get(`${this.appUrl}/api/collections/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.appUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.appUrl}/api/collections/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.appUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.appUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.appUrl}/api/places/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.appUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
