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
    mozart: {
      title: "Mozart Favourites",
      userid: "->users.bart"
    }
  },
  places: {
    _model : "Place",
    place_1 : {
      title: "Violin Concerto No. 1",
      category: "Mozart",
      latitude: 15,
      collectionid: "->collections.mozart"
    },
    place_2 : {
      title: "Violin Concerto No. 2",
      category: "Mozart",
      latitude: 11,
      collectionid: "->collections.mozart"
    },
    place_3 : {
      title: "Violin Concerto No. 3",
      category: "Mozart",
      latitude: 23,
      collectionid: "->collections.mozart"
    }
  }
};
