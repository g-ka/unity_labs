const express = require('express');
const router = express.Router();
const seller_controller = require('../../controller/Seller_controller');

router.get('/get_orders', seller_controller.get_orders_handler);
router.post('/post_items', seller_controller.post_items_handler);

module.exports = router;