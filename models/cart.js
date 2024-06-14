const fs = require("fs");
const path = require("path");

const cartDataPath = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
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
};
