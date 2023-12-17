const {
  deleteImgCloudinary,
} = require("../../middlewares/uploadImg-middleware");
const Classic = require("../models/classic-model");

const getAllClassics = async (req, res, next) => {
  try {
    const allClassics = await Classic.find();
    return res.status(200).json(allClassics);
  } catch (error) {
    return next("allClassics not found 😑", error);
  }
};

const createClassic = async (req, res, next) => {
  try {
    const newClassic = await Classic(req.body);
    if (req.file) {
      newClassic.image = req.file.path;
    } else {
      newClassic.image = "No image";
    }
    const createdClassic = await newClassic.save();
    return res.status(200).json(createdClassic);
  } catch (error) {
    return next("Error while creating newClassic");
  }
};

const getClassicId = async (req, res, next) => {
  try {
    const classic = await Classic.findById(req.params.id);
    return res.status(200).json(classic);
  } catch (error) {
    return next("Classic not found 😢", error);
  }
};

const updateClassic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newClassic = await Classic(req.body);

    newClassic._id = id;

    const originalClassic = await Classic.findById(id);

    if (req.file) {
      deleteImgCloudinary(originalClassic.image);
      newClassic.image = req.file.path;
    }
    const updatedClassic = await Classic.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedClassic);
  } catch (error) {
    return next("Erroe while updating Classic 🤷‍♂️", error);
  }
};

const deleteClassic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClassic = await Classic.findByIdAndDelete(id);

    deleteImgCloudinary(deletedClassic.image);

    return res.status(200).json("Classic deleted");
  } catch (error) {
    return next("Classic not found 😢", error);
  }
};

const uploadClassicImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const originalClassic = await Classic.findById(id);
      if (originalClassic.image) {
        deleteImgCloudinary(originalClassic.image);
      }
      const updatedClassic = await Classic.findByIdAndUpdate(
        id,
        { $set: { image: req.file.path } },
        { new: true }
      );
      return res.status(200).json(updatedClassic);
    }
  } catch (error) {
    return next("Error uploading image 🤦‍♂️", error);
  }
};

module.exports = {
  getAllClassics,
  createClassic,
  getClassicId,
  updateClassic,
  deleteClassic,
  uploadClassicImg,
};
