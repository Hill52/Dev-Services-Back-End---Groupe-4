var express = require('express');
var router = express.Router();

const orders = [
    {
      id: "AuTR4-65ZTY",
      client_mail: "jan.neymar@yaboo.fr",
      order_date: "2022-01-05 12:00:23",
      total_amount: 25.95
    },
    {
      id: "657GT-I8G443",
      client_mail: "jan.neplin@gmal.fr",
      order_date: "2022-01-06 16:05:47",
      total_amount: 42.95
    },
    {
      id: "K9J67-4D6F5",
      client_mail: "claude.francois@grorange.fr",
      order_date: "2022-01-07 17:36:45",
      total_amount: 14.95
    }
  ]
/* GET users listing. */

router.get('/', (req, res) => {
    res.json({
      type: "collection",
      count: orders.length,
      orders: orders
    });
  });

router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    let order = orders.find(o => o.id === orderId);
    order.client_name = "claude francois";
    order.delivery_date = "2022-01-08 12:30";
    res.json({
      type: "resource",
      order: order
    });
  });

module.exports = router;
