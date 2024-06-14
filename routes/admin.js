const express = require("express");

const productsControllerAdmin = require("../controllers/productsAdmin");

const router = express.Router(); // exports. only working for methods

router.get("/products", productsControllerAdmin.getProducts);
router.get("/add-product", productsControllerAdmin.getAddProduct);
router.post("/add-product", productsControllerAdmin.postAddProduct);
router.get("/edit-product", productsControllerAdmin.getEditProduct);
router.post("/edit-product", productsControllerAdmin.postEditProduct);
router.post("/delete-product", productsControllerAdmin.postDeleteProduct);

module.exports = router;
