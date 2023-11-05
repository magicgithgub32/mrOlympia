const express = require("express");
const contestsRouter = require("./contest-routes");
const winnersRouter = require("./winner-routes");
const noCrownWinnersRouter = require("./noCrownWinner-routes");

const mainRouter = express.Router();

mainRouter.use("/contests", contestsRouter);
mainRouter.use("/winners", winnersRouter);
mainRouter.use("/noCrownWinners", noCrownWinnersRouter);

module.exports = mainRouter;
