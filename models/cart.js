const mongodb = require("mongodb");

const getDb = require("../utils/database").getDb;

const Product = require("./product");

let cartArr = [];
const cartProducts = [];

const getCollection = (name) => {
  const db = getDb();
  return db.collection(name);
};

const getCollectionData = async (cb) => {
  try {
    const cart = getCollection("cart");
    const cursor = await cart.find();

    cartArr = await cursor.toArray();
  } finally {
    cb(cartArr);
  }
};

const fetchAll = async (cb) => {
  getCollectionData((data) => {
    cb(data);
  });
};

module.exports = class Cart {
  static addToCart = async (details) => {
    try {
      const cart = getCollection("cart");
      const query = { _id: new mongodb.ObjectId(details._id) };

      const dbEntry = await cart.findOne(query);

      if (!dbEntry) {
        const newEntry = {
          _id: new mongodb.ObjectId(details._id),
          qty: 1,
          total: +details.price,
        };

        return cart.insertOne(newEntry);
      }

      if (dbEntry) {
        const filter = { _id: new mongodb.ObjectId(details._id) };

        return cart.updateOne(filter, {
          $set: {
            qty: dbEntry.qty + 1,
            total: +dbEntry.total + +details.price,
          },
        });
      }

      console.log(details);

      /* return cart
      .updateOne(filter, {
        _id: new mongodb.ObjectId(details.id)
      }) */
    } catch (err) {
      console.log(err);
    }
  };

  static getCartProductData = async (cb) => {
    await fetchAll((cart) => {
      if (cart.length > cartProducts.length) {
        cart.forEach((item) => {
          Product.fetchOne(item._id, (product) => {
            cartProducts.push({ name: product.title, qty: item.qty });
            //console.log(cartProducts);
          });
        });
      }

      cb([...cartProducts]);
      //cartProducts.length = 0;
    });
  };
};

/* module.exports = class Cart {
  static addToCart = (product) => {
    Cart.fetch((cart) => {
      if (cart === false) {
        let entry = {
          id: product.id,
          qty: 1,
        };

        let products = {
          products: [entry],
          total: +product.price,
        };

        console.log(products);

        fs.writeFile(cartDataPath, JSON.stringify(products), () => {
          console.log("Cart Updated");
        });
      } else {
        let cartArr = [...cart.products];
        let cartTotal = cart.total;
        console.log(cart);
        if (cartArr.find((cartEntry) => cartEntry.id === product.id)) {
          cartArr.forEach((cartEntry) => {
            if (cartEntry.id === product.id) {
              cartEntry.qty++;
              Cart.update(cartArr, cartTotal, +product.price);
            }
          });
        } else {
          let entry = {
            id: product.id,
            qty: 1,
          };

          Cart.update(cartArr, cartTotal, +product.price, entry);
        }
      }
    });
  };

  static fetch = (cb) => {
    fs.readFile(cartDataPath, (err, data) => {
      if (err) {
        cb(false);
      } else {
        let cart = JSON.parse(data);
        cb(cart);
      }
    });
  };

  static update = (cartArr, total, price, entry) => {
    total += price;
    if (entry) cartArr.push(entry);

    let cartUpdated = {
      products: [...cartArr],
      total: total,
    };

    fs.writeFile(cartDataPath, JSON.stringify(cartUpdated), () => {
      console.log("Cart Updated");
    });
  };
}; */
