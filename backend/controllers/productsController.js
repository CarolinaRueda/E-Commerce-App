const pool = require("../db/dbConfig");

const getOutProducts = async (req, res) => {
  try {
    const products = await pool.query(
      "select * from products order by name ASC"
    );
    res.json({ products: products.rows });
  } catch (err) {
    throw err;
  }
};

const getOutProductsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await pool.query("select * from products where id = $1", [
      id,
    ]);
    res.send(products.rows[0]);
  } catch (err) {
    throw err;
  }
};

const addNewProduct = async (req, res) => {
  const { name, quantity, description, price } = req.body;
  const text =
    "insert into products (name, quantity, description, price) values($1, $2, $3, $4)";
  const values = [name, quantity, description, price];

  try {
    const product = await pool.query(text, values);
    res.send(product.rows[0]);
  } catch (err) {
    throw err;
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, description, price } = req.body;
    const product = await pool.query(
      "update products set name = $1, quantity = $2, description = $3, price = $4 where id = $5 returning *",
      [name, quantity, description, price, id]
    );
    res.send(product.rows[0]);
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("delete from products where id = $1", [id]);
    res.send(`Product with id:${id} successfully removed.`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getOutProducts,
  getOutProductsByID,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
