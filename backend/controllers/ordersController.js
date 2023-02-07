const pool = require("../db/dbConfig");

// Route: orders/:userId
const getOutOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const ordersQuery = await pool.query(
      "select * from orders where user_id = $1 order by status DESC",
      [userId]
    );

    const orders = ordersQuery.rows;

    for (const order of orders) {
      const { id } = order;
      order.products = [];

      const itemsQuery = await pool.query(
        "select * from order_item where order_id = $1",
        [id]
      );
      const items = itemsQuery.rows;

      for (const item of items) {
        const { product_id } = item;

        const productQuery = await pool.query(
          "select * from products where id = $1",
          [product_id]
        );
        const product = productQuery.rows[0];

        const productInfo = {
          product_name: product.name,
          product_quantity: item.quantity,
          product_price: product.price,
        };
        order.products.push(productInfo);
      }
    }

    res.json({ orders });
  } catch (err) {
    throw err;
  }
};

const getOutOrdersByID = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await pool.query("select * from orders where id = $1", [id]);
    res.send(orders.rows[0]);
  } catch (err) {
    throw err;
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    const order = await pool.query(
      "update orders set status = $1, modified = $2 where id = $3 returning *",
      [status, modified, id]
    );
    if (order.rows[0].status === "cancelled") {
      res.redirect(`/orders/cancel/${id}`);
    } else {
      res.redirect("/orders");
    }
  } catch (err) {
    throw err;
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "select quantity, product_id from order_items where order_id = $1",
      [id]
    );

    for (const product of rows) {
      const { quantity, product_id } = product;

      await pool.query(
        "update products set quantity = quantity + $1 where id = $2",
        [quantity, product_id]
      );
    }

    await pool.query("delete from order_item where order_id = $1", [1]);
    await pool.query("delete from orders where id = $1", [id]);
    res.send(`Deleted order with ID: ${id}`);
  } catch (err) {
    throw err;
  }
};

// Route: orders/:id/updateOrder
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    await pool.query(
      "update orders set status = $1,modified = $2 where id = $3",
      [status, modified, id]
    );
    // Cancel order
    if (status === "Cancelled") {
      const { rows } = await pool.query(
        "select quantity, product_id from order_item where order_id = $1",
        [id]
      );

      for (const product of rows) {
        const { quantity, product_id } = product;

        await pool.query(
          "update products set quantity = quantity + $1 where id = $2",
          [quantity, product_id]
        );
      }

      await pool.query("delete from order_item where order_id = $1", [id]);
    }

    res.json({ id, status });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getOutOrders,
  getOutOrdersByID,
  updateOrder,
  deleteOrder,
  updateStatus,
};
