const routerSi = require("./googleRouter");

const indexRouter = require("express").Router(),
  cartRouter = require("./cartRouter"),
  checkoutRouter = require("./checkoutRouter"),
  loginRouter = require("./loginRouter"),
  logoutRouter = require("./logoutRouter"),
  ordersRouter = require("./ordersRouter"),
  productsRouter = require("./productsRouter"),
  registerRouter = require("./registerRouter"),
  usersRouter = require("./usersRouter"),
  pageRouter = require("./pageRouter"),
  googleRouter = require("./googleRouter"),
  { isNotAuthenticate } = require("../middleware/auth");

indexRouter.use("/user", cartRouter);
indexRouter.use("/checkout", checkoutRouter);
indexRouter.use("/google", googleRouter);
indexRouter.use("/login", loginRouter);
indexRouter.use("/logout", logoutRouter);
indexRouter.use("/orders", ordersRouter);
indexRouter.use("/products", productsRouter);
indexRouter.use("/register", registerRouter);
indexRouter.use("/users", usersRouter);
indexRouter.use("/", pageRouter);

module.exports = indexRouter;
