const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  try {
    Product.fetchAll((products) => {
      res.render("shop/product-list", {
        isAdminProductListPage: true,
        productCSS: true,
        title: "Admin Products",
        //productsExist: products.length > 0,
        products: products,
      });
    });
  } catch (err) {
    console.log("template error");
  }
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    isAddProductPage: true,
    addProductCSS: true,
    title: "Add Product",
  });
};

exports.getEditProduct = (req, res, next) => {
  const id = req.query._id;

  Product.fetchOne(id, (product) => {
    res.render("admin/add-product", {
      isEditProductPage: true,
      addProductCSS: true,
      title: "Edit Product",
      productExist: product && true,
      product: product,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
  product.save();
  res.redirect("/admin/products");
};

exports.postEditProduct = (req, res, next) => { // to do
  console.log(req.body._id)
  const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description, req.body._id);
  product.edit();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  console.log(req.body._id);
  Product.delete(req.body._id);
  res.redirect("/admin/products");
};
