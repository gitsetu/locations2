export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  collections: {
    _model: "Collection",
    park: {
      title: "Park Favourites",
      userid: "->users.bart"
    }
  },
  places: {
    _model : "Place",
    place_1 : {
      title: "Forest 1",
      category: "Park",
      latitude: 15,
      longitude: 10,
      collectionid: "->collections.park"
    },
    place_2 : {
      title: "Forest 2",
      category: "Park",
      latitude: 11,
      longitude: 11,
      collectionid: "->collections.park"
    },
    place_3 : {
      title: "Forest 3",
      category: "Lake",
      latitude: 23,
      longitude: 12,
      collectionid: "->collections.park"
    }
  }
};
