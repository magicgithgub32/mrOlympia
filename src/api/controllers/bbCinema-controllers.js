const {
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const BbCinema = require("../models/bbCinema-model");

const getAllBbCinema = async (req, res, next) => {
  try {
    const allBbCinema = await BbCinema.find();
    return res.status(200).json(allBbCinema);
  } catch (error) {
    return next("allBbCinema not found 🥺", error);
  }
};

const createBbCinema = async (req, res, next) => {
  try {
    const newBbCinema = await BbCinema(req.body);
    if (req.file) {
      newBbCinema.image = req.file.path;
    } else {
      newBbCinema.image = "No image";
    }
    const createdBbCinema = await newBbCinema.save();
    return res.status(200).json(createdBbCinema);
  } catch (error) {
    return next("Error while creating newBbCinema");
  }
};

const getBbCinemaById = async (req, res, next) => {
  try {
    const bbCinema = await BbCinema.findById(req.params.id);
    return res.status(200).json(bbCinema);
  } catch (error) {
    return next("bbCinema not found 😢");
  }
};

const updateBbCinema = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBbCinema = await BbCinema(req.body);

    newBbCinema._id = id;

    const originalBbCinema = await BbCinema.findById(id);

    if (req.file) {
      deleteImgCloudinary(originalBbCinema.image);
      newBbCinema.image = req.file.path;
    }
    const updateBbCinema = await BbCinema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateBbCinema);
  } catch (error) {
    return next("Error while updating BbCinema 🤷‍♂️", error);
  }
};

const deleteBbCinema = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBbCinema = await BbCinema.findByIdAndDelete(id);

    deleteImgCloudinary(deletedBbCinema.image);
    return res.status(200).json("BbCinema deleted");
  } catch (error) {
    return next("BbCinema not found");
  }
};

const uploadBbCinemaImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const originalBbCinema = await BbCinema.findByIdAndDelete(id);
      if (originalBbCinema.image) {
        deleteImgCloudinary(originalBbCinema.image);
      }
      const updatedBbCinema = await BbCinema.findByIdAndUpdate(
        id,
        { $set: { image: req.file.path } },
        { new: true }
      );
      return res.status(200).json(updatedBbCinema);
    }
  } catch (error) {
    return next("Eror uploading image 😈", error);
  }
};

module.exports = {
  getAllBbCinema,
  createBbCinema,
  getBbCinemaById,
  updateBbCinema,
  deleteBbCinema,
  uploadBbCinemaImg,
};
