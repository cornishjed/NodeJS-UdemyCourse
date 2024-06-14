const express = require("express");

const router = express.Router();

const productsControllerShop = require("../controllers/productsShop");

router.get("/", productsControllerShop.getIndex);
router.get("/products", productsControllerShop.getProducts);
router.get("/cart", productsControllerShop.getCart);
router.post("/cart", productsControllerShop.postCart);
router.get("/checkout", productsControllerShop.getCheckout);
router.get("/orders", productsControllerShop.getOrders);
router.get("/product-detail/:productId", productsControllerShop.getProductDetail);

module.exports = router;
