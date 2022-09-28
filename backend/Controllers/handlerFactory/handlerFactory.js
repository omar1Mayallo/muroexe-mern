import asyncHandler from "express-async-handler";
import APIError from "../../utils/apiError.js";
import APIFeatures from "../../utils/apiFeatures.js";

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    //For Nested Route
    let filter = {};
    if (req.filterObj) filter = req.filterObj;

    const numOfDocs = await Model.countDocuments();
    const apiFeatures = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .paginate(numOfDocs)
      .sort()
      .limitFields()
      .search();

    const {paginationResults, query} = apiFeatures;
    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      paginationResults,
      data: {
        docs,
      },
    });
  });

export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const doc = await Model.findById(id).select("-__v");

    if (!doc) {
      return next(new APIError(`There is no doc match this id : ${id}`, 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new APIError(`There is no doc match this id : ${id}`, 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new APIError(`There is no doc match this id : ${id}`, 404));
    }
    res.status(204).json({
      status: "success",
    });
  });
