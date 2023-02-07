const stripe = require("stripe")(process.env.STRIPE_KEY);
const pool = require("../db/dbConfig");

const getCheckout = (req, res) => {
  res.send("/checkout GET request received");
};

const checkOut = async (req, res) => {
  const { cartId } = req.params;
  const { deliverDate, userId, total, items, status } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    const newOrder = await pool.query(
      "insert into orders (deliver_date, user_id, status, modified, total) values ($1, $2, $3, $4, $5) RETURNING *",
      [deliverDate, userId, "Pending", modified, total]
    );

    for (const item of items) {
      const { product_id, quantity, price } = item;

      await pool.query(
        "delete from cart_items where product_id = $1 and cart_id = $2",
        [product_id, cartId]
      );

      await pool.query(
        "insert into order_item (order_id, product_id, quantity, price) values ($1, $2, $3, $4)",
        [newOrder.rows[0].id, product_id, quantity, price]
      );

      await pool.query(
        "update products set quantity = quantity - $1 where id = $2",
        [quantity, product_id]
      );

      await pool.query("update carts set modified = $1 where id = $2", [
        modified,
        cartId,
      ]);
    }
    res.json({ msg: "order created successfully!" });
  } catch (err) {
    throw err;
  }
};

const checkoutStripe = async (req, res) => {
  const { items } = req.body;

  let lineItems = [];

  items.forEach((item) => {
    lineItems.push({
      price: item.stripe,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({
    url: session.url,
  });
};

module.exports = { getCheckout, checkOut, checkoutStripe };
