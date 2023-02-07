const { Client } = require("pg");
const { DB } = require("./config");

(async () => {
  const createUsersTb = `
    CREATE TABLE IF NOT EXISTS users (
      id          BIGSERIAL     PRIMARY KEY NOT NULL,
      first_name  VARCHAR(50),
      last_name   VARCHAR(50),
      email       VARCHAR(50)   NOT NULL,
      password    TEXT,
      google_id   TEXT
  );
`;

  const createCartTb = `
    CREATE TABLE IF NOT EXISTS carts (
      id          BIGSERIAL    PRIMARY KEY NOT NULL,
      created     DATE,
      modified    DATE
  );
`;

  const createProductsTb = `
    CREATE TABLE IF NOT EXISTS products (
      id          BIGSERIAL PRIMARY KEY NOT NULL,
      name        VARCHAR(50),
      quantity    INT,
      description VARCHAR(50),
      price       MONEY,
      stripe      TEXT,
      image       TEXT
  );
`;

  const createOrdersTb = `
    CREATE TABLE IF NOT EXISTS orders (
      id            BIGSERIAL PRIMARY KEY NOT NULL,
      deliver_date  DATE,
      total         MONEY,
      status        VARCHAR(20),
      modified      DATE,
      user_id       INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

  const createOrderItemTb = `
    CREATE TABLE IF NOT EXISTS order_item (
      id            BIGSERIAL PRIMARY KEY NOT NULL,
      quantity      INT,
      price         MONEY,
      order_id      INT,
      product_id    INT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
  );
`;

  const createCartItemsTb = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id          BIGSERIAL PRIMARY KEY NOT NULL,
      quantity    INT,
      modified    DATE,
      user_id     INT,
      product_id  INT,
      cart_id     INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
  );
`;

  const addSampleProducts = `
  INSERT INTO products (name, quantity, description, price)
    VALUES ('T-Shirt Black', 40, 'T-Shirt. Made of Polyester', 9.99);
  INSERT INTO products (name, quantity, description, price)
    VALUES ('Jogger Grey', 40, '
    Jogger. Made of cotton.', 19.99);
  INSERT INTO products (name, quantity, description, price)
    VALUES ('Cardigan Black', 40, '
    Cardigan. Made of Viscose, Nylon and Polyester.', 49.99);
  INSERT INTO products (name, quantity, description, price)
    VALUES ('T-Shirt White', 40, 'T-Shirt. Made of Polyester', 9.99);
  INSERT INTO products (name, quantity, description, price)
    VALUES ('Jean Mom Fit', 40, 'Jean. Made of Cotton and Polyester.', 24.99);
  INSERT INTO products (name, quantity, description, price)
    VALUES ('Hoodie Black', 40, 'Hoodie. Made of Cotton and Polyester.', 29.99);
  INSERT INTO products (name, quantity, description, price)
    VALUES ('Hoodie White', 40, 'Hoodie. Made of Cotton and Polyester.', 29.99);
`;

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGNAME,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });

    await db.connect();
    await db.query(createUsersTb);
    await db.query(createCartTb);
    await db.query(createProductsTb);
    await db.query(createOrdersTb);
    await db.query(createOrderItemTb);
    await db.query(createCartItemsTb);
    await db.query(addSampleProducts);
    await db.end();
  } catch (err) {
    throw err;
  }
})();
