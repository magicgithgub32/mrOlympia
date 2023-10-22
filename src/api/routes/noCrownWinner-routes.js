const express = require("express");
const {
  uploadWinnerImgCloudinary,
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const {
  getAllNoCrownWinners,
  getNoCrownWinnerById,
  updateNoCrownWinner,
  deleteNoCrownWinner,
  createNoCrownWinner,
  uploadNoCrownWinnerImg,
} = require("../controllers/noCrownWinner-controller");

const router = express.Router();

router.get("/", getAllNoCrownWinners);
router.get("/:id", getNoCrownWinnerById);
router.post("/", uploadNoCrownWinnerImg.single("image"), createNoCrownWinner);
router.put("/:id", updateNoCrownWinner);
router.delete("/:id", deleteNoCrownWinner);
router.patch(
  "/:id",
  uploadNoCrownWinnerImg.single("image"),
  uploadNoCrownWinnerImg
);

module.exports = router;
