const express = require("express");
const {
  getAllBbCinema,
  getBbCinemaById,
  createBbCinema,
  updateBbCinema,
  deleteBbCinema,
  uploadBbCinemaImg,
} = require("../controllers/bbCinema-controllers");
const {
  uploadBbCinemaImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");

const router = express.Router();

router.get("/", getAllBbCinema);
router.get("/:id", getBbCinemaById);
router.post("/", uploadBbCinemaImgCloudinary.single("image"), createBbCinema);
router.put("/:id", updateBbCinema);
router.delete("/:id", deleteBbCinema);
router.patch(
  "/:id",
  uploadBbCinemaImgCloudinary.single("image"),
  uploadBbCinemaImg
);

module.exports = router;
