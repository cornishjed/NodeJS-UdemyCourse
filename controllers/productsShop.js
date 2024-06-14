const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getCart = (req, res, next) => {
  // adds method to the exports object
  res.render("shop/cart", {
    title: "Cart",
    isCartPage: true,
  });
};

exports.postCart = (req, res, next) => {
  const productCartDetails = {
    id: req.body.productId,
    price: req.body.productPrice,
  };

  Cart.addToCart(productCartDetails);
  res.redirect("/");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    isCheckoutPage: true,
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    title: "Orders",
    isOrdersPage: true,
  });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchOne(productId, (product) => {
    res.render("shop/product-detail", {
      title: product.title,
      isProductPage: true,
      isProductDetailPage: true,
      product: product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  try {
    Product.fetchAll((products) => {
      res.render("shop/product-list", {
        isShopPage: true,
        isIndexPage: true,
        productCSS: true,
        title: "Shop",
        productsExist: products.length > 0,
        products: products,
      });
    });
  } catch (err) {
    console.log("template error");
  }
};

exports.getProducts = (req, res, next) => {
  try {
    Product.fetchAll((products) => {
      res.render("shop/product-list", {
        isShopPage: true,
        isProductPage: true,
        productCSS: true,
        title: "Shop",
        productsExist: products.length > 0,
        products: products,
      });
    });
  } catch (err) {
    console.log("template error");
  }
};
