const {
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const Winner = require("../models/winner-model");

const getAllWinners = async (req, res, next) => {
  try {
    const winners = await Winner.find();
    return res.status(200).json(winners);
  } catch (error) {
    return next("Winners not found 😐", error);
  }
};

const createWinner = async (req, res, next) => {
  try {
    const newWinner = new Winner(req.body);

    if (req.file) {
      newWinner.image = req.file.path;
    } else {
      newWinner.image = "No image";
    }
    const createdWinner = await newWinner.save();
    return res.status(200).json(createdWinner);
  } catch (error) {
    return next("Error while creating new Winner 😨", error);
  }
};

const getWinnerById = async (req, res, next) => {
  try {
    const winner = await Winner.findById(req.params.id);
    return res.status(200).json(winner);
  } catch (error) {
    return next("Winner not found 😰", error);
  }
};

const updateWinner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newWinner = new Winner(req.body);

    newWinner._id = id;

    const originalWinner = await Winner.findById(id);

    if (req.file) {
      deleteImgCloudinary(originalWinner.image);
      newWinner.image = req.file.path;
    }

    const updatedWinner = await Winner.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedWinner);
  } catch (error) {
    return next("Error while updating Winner 🙅‍♂️", error);
  }
};

const deleteWinner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWinner = await Winner.findByIdAndDelete(id);

    deleteImgCloudinary(deletedWinner.image);

    return res.status(200).json("Winner deleted succesfully ␡");
  } catch (error) {
    return next("Winner not found 🤷‍♂️", error);
  }
};

const uploadWinnerImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const originalWinner = await Winner.findById(id);
      if (originalWinner.image) {
        deleteImgCloudinary(originalWinner.image);
      }
      const updatedWinner = await Winner.findByIdAndUpdate(
        id,
        { $set: { image: req.file.path } },
        { new: true }
      );
      return res.status(200).json(updatedWinner);
    }
  } catch (error) {
    return next("Error uploading image 👎", error);
  }
};

module.exports = {
  getAllWinners,
  createWinner,
  getWinnerById,
  updateWinner,
  deleteWinner,
  uploadWinnerImg,
};
