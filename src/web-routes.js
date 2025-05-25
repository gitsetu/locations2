import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { collectionController } from "./controllers/collection-controller.js";
import { placeController } from "./controllers/place-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcollection", config: dashboardController.addCollection },
  { method: "GET", path: "/dashboard/deletecollection/{id}", config: dashboardController.deleteCollection },

  { method: "GET", path: "/collection/{id}", config: collectionController.index },
  { method: "POST", path: "/collection/{id}/addplace", config: collectionController.addPlace },
  { method: "GET", path: "/collection/{id}/deleteplace/{placeid}", config: collectionController.deletePlace },

  { method: "GET", path: "/place/{id}/editplace/{placeid}", config: placeController.index },
  { method: "POST", path: "/place/{id}/updateplace/{placeid}", config: placeController.update },

  { method: "POST", path: "/collection/{id}/uploadimage", config: collectionController.uploadImage },
  { method: "POST", path: "/collection/{id}/deleteimage", config: collectionController.deleteImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
