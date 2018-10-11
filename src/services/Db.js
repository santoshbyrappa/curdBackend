const Mongoose = require('mongoose');

class Db {

  init() {
    const URL = process.env.MONGO_URL;
    if (! URL) {
      throw Error(`MongoDB connection url (MONGO_URL) is required, none given.`);
    }

    return this.establishConnection(URL);
  }

  establishConnection(url, options = {}) {
    return Mongoose.connect(url, options)
        .then( () => {
            console.log(`DB: Connected to ${url}`);
            Mongoose.set('debug', (collectionName, method, query, doc) => {
                console.log(`Query: ${collectionName}.${method}`, query);
            });
        })
        .catch( (error) => {
            console.log("Mongoose failed to connect to MongoDB.");
            console.error("Mongoose connection error: ", error);
            process.exit(0);
        });
    }
};

module.exports = new Db();