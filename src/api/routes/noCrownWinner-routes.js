const express = require("express");
const {
  getAllNoCrownWinners,
  getNoCrownWinnerById,
  createNoCrownWinner,
  updateNoCrownWinner,
  deleteNoCrownWinner,
  uploadNoCrownWinnerImg,
} = require("../controllers/noCrownWinner-controllers");
const {
  uploadnoCrownWinnerImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const router = express.Router();

router.get("/", getAllNoCrownWinners);
router.get("/:id", getNoCrownWinnerById);
router.post(
  "/",
  uploadnoCrownWinnerImgCloudinary.single("image"),
  createNoCrownWinner
);
router.put("/:id", updateNoCrownWinner);
router.delete("/:id", deleteNoCrownWinner);
router.patch(
  "/:id",
  uploadnoCrownWinnerImgCloudinary.single("image"),
  uploadNoCrownWinnerImg
);

module.exports = router;
