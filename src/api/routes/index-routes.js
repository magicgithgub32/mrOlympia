const express = require("express");
const contestsRouter = require("./contest-routes");
const winnersRouter = require("./winner-routes");

const mainRouter = express.Router();

mainRouter.use("/contests", contestsRouter);
mainRouter.use("/winners", winnersRouter);

module.exports = mainRouter;
