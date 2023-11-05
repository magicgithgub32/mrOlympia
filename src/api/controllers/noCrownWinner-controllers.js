const {
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const NoCrownWinner = require("../models/noCrownWinner-model");

const getAllNoCrownWinners = async (req, res, next) => {
  try {
    const noCrownWinners = await NoCrownWinner.find();
    return res.status(200).json(noCrownWinners);
  } catch (error) {
    return next("NoCrownWinners not found 🥺", error);
  }
};

const createNoCrownWinner = async (req, res, next) => {
  try {
    const newNoCrownWinner = await NoCrownWinner(req.body);
    if (req.file) {
      newNoCrownWinner.image = req.file.path;
    } else {
      newNoCrownWinner.image = "No image";
    }
    const createdNoCrownWinner = await newNoCrownWinner.save();
    return res.status(200).json(createdNoCrownWinner);
  } catch (error) {
    return next("Error while creating new NoCrownWinner 😑", error);
  }
};

const getNoCrownWinnerById = async (req, res, next) => {
  try {
    const noCrownWinner = await NoCrownWinner.findById(req.params.id);
    return res.status(200).json(noCrownWinner);
  } catch (error) {
    return next("NoCrownWinner not found 😢", error);
  }
};

const updateNoCrownWinner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newNoCrownWinner = await NoCrownWinner(req.body);

    newNoCrownWinner._id = id;

    const originalNoCrownWinner = await NoCrownWinner.findById(id);

    if (req.file) {
      deleteImgCloudinary(originalNoCrownWinner._image);
      newNoCrownWinner.image = req.file.path;
    }

    const updatedNoCrownWinner = await NoCrownWinner.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedNoCrownWinner);
  } catch (error) {
    return next("Error while updating NoCrownWinner 🤦‍♂️", error);
  }
};

const deleteNoCrownWinner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNoCrownWiner = await NoCrownWinner.findByIdAndDelete(id);

    deleteImgCloudinary(deleteNoCrownWinner.image);

    return res.status(200).json("NoCrownWinner deleted succesfully");
  } catch (error) {
    return next("NoCrownWinner not found 🤷‍♂️", error);
  }
};

const uploadNoCrownWinnerImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const originalNoCrownWinner = await NoCrownWinner.findById(id);
      if (originalNoCrownWinner.image) {
        deleteImgCloudinary(originalNoCrownWinner.image);
      }
      const updatedNoCrownWinner = await NoCrownWinner.findByIdAndUpdate(
        id,
        { $set: { image: req.file.path } },
        { new: true }
      );
      return res.status(200).json(updatedNoCrownWinner);
    }
  } catch (error) {
    return next("Error uploading image 🙈", error);
  }
};

module.exports = {
  getAllNoCrownWinners,
  createNoCrownWinner,
  getNoCrownWinnerById,
  updateNoCrownWinner,
  deleteNoCrownWinner,
  uploadNoCrownWinnerImg,
};
