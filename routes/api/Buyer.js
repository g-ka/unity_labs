const express = require('express');
const router = express.Router();
const buyer_controller = require('../../controller/Buyer_controller');

router.get('/get_sellers', buyer_controller.get_sellers_handler);
router.get('/get_catalog', buyer_controller.get_catalog_handler);
router.get('/get_orders', buyer_controller.get_orders_handler);
router.post('/post_orders', buyer_controller.post_orders_handler);

module.exports = router;