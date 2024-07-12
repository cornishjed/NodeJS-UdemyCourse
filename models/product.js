const mongodb = require("mongodb");

const getDb = require("../utils/database").getDb;

let productsArr;

const getCollection = (name) => {
  const db = getDb();
  return db.collection(name);
}

const getCollectionData = async (cb) => {
  try {
    const products = getCollection("products");
    const cursor = await products.find();

    productsArr = await cursor.toArray();
  } finally {
    cb(productsArr);
  }
};

module.exports = class Product {
  constructor(title, imageUrl, price, description, _id = new mongodb.ObjectId()) {
    this._id = _id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save = () => {
    const products = getCollection("products");

    return products
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  edit = () => {
    const products = getCollection("products");
    const filter = {
      _id: new mongodb.ObjectId(this._id),
    };
    const updateProduct = {
      $set: {
        title: this.title,
        imageUrl: this.imageUrl,
        price: this.price,
        description: this.description
      }
    }

    return products
      .updateOne(filter, updateProduct)
      .then(result => {
        console.log(
          `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
      })
      .catch(err => {
        console.log(err);
      })
  };

  static delete = (_id) => {
    const products = getCollection("products");
    const options = {
      _id: new mongodb.ObjectId(_id),
    };

    return products
      .deleteOne(options)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  static fetchAll = (cb) => {
    getCollectionData((data) => {
      cb(data); // cb is a function that will receive given arguments
    });
  };

  static fetchOne = async (_id, cb) => {
    const products = getCollection("products");
    const query = {
      _id: new mongodb.ObjectId(_id),
    };
    
    return await products
      .findOne(query)
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      })
  };
};
