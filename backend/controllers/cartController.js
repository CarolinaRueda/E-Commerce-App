const pool = require("../db/dbConfig");

const getOutCarts = async (req, res) => {
  try {
    const carts = await pool.query("select * from cart");
    res.send(carts.rows);
  } catch (err) {
    throw err;
  }
};

const getOutCartByID = async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await pool.query(
      "select * from cart_items where cart_id = $1",
      [cartId]
    );
    res.send(cart.rows);
  } catch (err) {
    throw err;
  }
};

const addNewCart = async (req, res) => {
  const { userId } = req.body;
  const created = new Date().toISOString().split("T")[0];

  try {
    const cart = await pool.query(
      "insert into carts (created, user_id) values ($1, $2) returning *",
      [created, userId]
    );
    res.json({ id: cart.rows[0].id });
  } catch (err) {
    throw err;
  }
};

const updateCart = async (req, res) => {
  const { userId, cartId } = req.params;
  const { quantity, product_id } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    await pool.query("update cart set modified = $1 where id = $2", [
      modified,
      cartId,
    ]);

    const newItem = await pool.query(
      "insert into cart_items (product_id, user_id, quantity, modified,  cart_id) values ($1, $2, $3, $4, $5) returning *",
      [product_id, userId, quantity, modified, cartId]
    );
    res.send(newItem.rows[0]);
  } catch (err) {
    throw err;
  }
};

const deleteCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    await pool.query("delete from carts where id = $1", [cartId]);
    res.send(`Deleted cart with ID: ${cartId}`);
  } catch (err) {
    throw err;
  }
};

// Route  user/cart/:cartId/item/:productId
const deleteOneItem = async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const deleteItem = await pool.query(
      "delete from cart_items where product_id = $1 and cart_id = $2 returning *",
      [productId, cartId]
    );

    if (!deleteItem.rowCount) {
      console.log("error deleting item");
      res.status(404).json({ error: "delete query error" });
    }
    res.json({ id: productId });
  } catch (err) {
    throw err;
  }
};

// Route /cart/:cartId/:userId
const deleteAllItems = async (req, res) => {
  const { cartId, userId } = req.params;
  try {
    await pool.query(
      "delete from cart_items where cart_id = $1 and user_id = $2",
      [cartId, userId]
    );
    res.json({});
  } catch (err) {
    throw err;
  }
};

const addOneItem = async (req, res) => {
  const { userId, cartId } = req.params;
  const { productId, quantity } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    const addItem = await pool.query(
      "insert into cart_items (product_id, user_id, quantity, modified,  cart_id) values ($1, $2, $3, $4, $5) returning *",
      [productId, userId, quantity, modified, cartId]
    );
    res.json({ item: addItem.rows[0] });
  } catch (err) {
    throw err;
  }
};

// get products by cartid from cartitems
// get /user/cart/:cartid/items
const getProductsByCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    const items = await pool.query(
      "select products.id as product_id, products.name as product_name, products.description as product_description, products.price as price,products.stripe as stripe, products.image as image, cart_items.quantity as quantity from products, cart_items where products.id = cart_items.product_id and cart_items.cart_id = $1",
      [cartId]
    );

    res.json({ items: items.rows });
  } catch (err) {
    throw err;
  }
};

const getCartId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await pool.query("select * from carts where user_id = $1", [
      userId,
    ]);
    if (!cart.rowCount) {
      res.json({ id: null });
      return;
    }
    res.json({ id: cart.rows[0].id });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addOneItem,
  getOutCarts,
  getCartId,
  getOutCartByID,
  getProductsByCart,
  addNewCart,
  updateCart,
  deleteCart,
  deleteOneItem,
  deleteAllItems,
};
