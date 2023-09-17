const express = require("express");
const {
  getAllWinners,
  getWinnerById,
  createWinner,
  updateWinner,
  deleteWinner,
  uploadWinnerImg,
} = require("../controllers/winner-controllers");
const {
  uploadWinnerImgCloudinary,
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");

const router = express.Router();

router.get("/", getAllWinners);
router.get("/:id", getWinnerById);
router.post("/", uploadWinnerImgCloudinary.single("image"), createWinner);
router.put("/:id", updateWinner);
router.delete("/:id", deleteWinner);
router.patch(
  "/:id",
  uploadWinnerImgCloudinary.single("image"),
  uploadWinnerImg
);

module.exports = router;
