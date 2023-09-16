const Contest = require("../models/contest-model");

const getAllContests = async (req, res, next) => {
  try {
    const contests = await Contest.find().populate("winner");
    return res.status(200).json(contests);
  } catch (error) {
    return next("Contests not found 😐", error);
  }
};

const createContest = async (req, res, next) => {
  try {
    const newContest = new Contest(req.body);
    const createdContest = await newContest.save();
    return res.status(200).json(createdContest);
  } catch (error) {
    return next("Error while creating new Contest 😨", error);
  }
};

const getContestById = async (req, res, next) => {
  try {
    const contest = await Contest.findById(req.params.id);
    return res.status(200).json(contest);
  } catch (error) {
    return next("Contest not found 😰", error);
  }
};

const updateContest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedContest = await Contest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedContest);
  } catch (error) {
    return next("Error while updating Contest 🙅‍♂️", error);
  }
};

const deleteContest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContest = await Contest.findByIdAndDelete(id);
    return res.status(200).json("Contest deleted succesfully ␡");
  } catch (error) {
    return next("Contest not found 🤷‍♂️", error);
  }
};

module.exports = {
  getAllContests,
  createContest,
  getContestById,
  updateContest,
  deleteContest,
};
