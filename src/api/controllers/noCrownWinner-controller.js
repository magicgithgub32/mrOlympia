const {
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const NoCrownWinner = require("../models/noCrownWinner-model");

const getAllNoCrownWinners = async (req, res, next) => {
  try {
    const noCrownwinners = await NoCrownWinner.find();
    return res.status(200).json(noCrownwinners);
  } catch (error) {
    return next("NoCrown-Winners not found 😐", error);
  }
};

const createNoCrownWinner = async (req, res, next) => {
  try {
    const newNoCrownWinner = new NoCrownWinner(req.body);

    if (req.file) {
      newNoCrownWinner.image = req.file.path;
    } else {
      newNoCrownWinner.image = "No image";
    }
    const createdNoCrownWinner = await newNoCrownWinner.save();
    return res.status(200).json(createdNoCrownWinner);
  } catch (error) {
    return next("Error while creating new NoCrown-Winner 😨", error);
  }
};

const getNoCrownWinnerById = async (req, res, next) => {
  try {
    const noCrownWinner = await NoCrownWinner.findById(req.params.id);
    return res.status(200).json(noCrownWinner);
  } catch (error) {
    return next("NoCrown-Winner not found 😰", error);
  }
};

const updateNoCrownWinner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newNoCrownWinner = new NoCrownWinner(req.body);

    newNoCrownWinner._id = id;

    const originalNoCrownWinner = await NoCrownWinner.findById(id);

    if (req.file) {
      deleteImgCloudinary(originalNoCrownWinner.image);
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
    return next("Error while updating NoCrown-Winner 🙅‍♂️", error);
  }
};

const deleteNoCrownWinner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNoCrownWinner = await NoCrownWinner.findByIdAndDelete(id);

    deleteImgCloudinary(deletedNoCrownWinner.image);

    return res.status(200).json("No Crown-Winner deleted succesfully ␡");
  } catch (error) {
    return next("NoCrown-Winner not found 🤷‍♂️", error);
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
    return next("Error uploading image 👎", error);
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
