const express = require("express");
const {
  getAllContests,
  getContestById,
  createContest,
  updateContest,
  deleteContest,
} = require("../controllers/contest-controllers");

const router = express.Router();

router.get("/", getAllContests);
router.get("/:id", getContestById);
router.post("/", createContest);
router.put("/:id", updateContest);
router.delete("/:id", deleteContest);

module.exports = router;
