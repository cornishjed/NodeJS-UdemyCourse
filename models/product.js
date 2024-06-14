const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const productDataPath = path.join(path.dirname(require.main.filename), "data", "products.json");

const getFileData = (cb) => {
  let products = [];

  fs.readFile(productDataPath, (err, data) => {
    if (!err) {
      try {
        products = JSON.parse(data);
      } catch (err) {
        console.log("No data/data error");
      }
    }
    cb(products);
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description, id) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save = () => {
    this.id = randomUUID();
    getFileData((products) => {
      products.push(this);
      fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
        if (err) console.log(err);
        else console.log("File appended.");
      });
    });
  };

  edit = () => {
    getFileData((products) => {
      products.forEach((product) => {
        if (product.id === this.id) {
          console.log("match found");
          product.title = this.title;
          product.imageUrl = this.imageUrl;
          product.price = this.price;
          product.description = this.description;
          fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
            if (err) console.log(err);
            else console.log("File edited.");
          });
        }
      });
    });
  };

  static delete = (id) => {
    getFileData((products) => {
      let i = 0;
      products.forEach((product) => {
        if (product.id === id) {
          products.splice(i, 1);
          fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
            if (err) console.log(err);
            else console.log("Entry deleted.");
          });
        }
        i++;
      });
    });
  };

  static fetchAll = (cb) => {
    getFileData((products) => {
      cb(products); // cb is a function that will receive given arguments
    });
  };

  static fetchOne = (id, cb) => {
    getFileData((products) => {
      products.forEach((product) => {
        if (product.id === id) {
          cb(product);
        }
      });
    })
  }
};
