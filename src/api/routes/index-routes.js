const express = require("express");
const contestsRouter = require("./contest-routes");
const winnersRouter = require("./winner-routes");
const noCrownWinnersRouter = require("./noCrownWinner-routes");
const classicsRouter = require("./classic-routes");
const bbCinemaRouter = require("./bbCinema-routes");

const mainRouter = express.Router();

mainRouter.use("/contests", contestsRouter);
mainRouter.use("/winners", winnersRouter);
mainRouter.use("/noCrownWinners", noCrownWinnersRouter);
mainRouter.use("/classics", classicsRouter);
mainRouter.use("/bbCinema", bbCinemaRouter);

module.exports = mainRouter;
