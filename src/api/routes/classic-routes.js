const express = require("express");
const {
  getAllClassics,
  getClassicId,
  uploadClassicImg,
  updateClassic,
  deleteClassic,
  createClassic,
} = require("../controllers/classic-controllers");
const {
  uploadClassicImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");

const router = express.Router();

router.get("/", getAllClassics);
router.get("/:id", getClassicId);
router.post("/", uploadClassicImgCloudinary.single("image"), createClassic);
router.put("/:id", updateClassic);
router.delete("/:id", deleteClassic);
router.patch(
  "/:id",
  uploadClassicImgCloudinary.single("image"),
  uploadClassicImg
);

module.exports = router;
