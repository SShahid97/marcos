const project = require("../db/models/project");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;
  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  res.status(201).json({
    message: "Project created successfully",
    status: 201,
    data: newProject,
  });
});

const getAllProjects = catchAsync(async (req, res, next) => {
  const result = await project.findAll({ include: user });
  const count = await project.count();
  return res.status(200).json({
    status: 200,
    message: "Projects fetched successfully",
    data: {
      projects: result,
      count: count,
    },
  });
});

const getProjectById = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const result = await project.findByPk(projectId, { include: user });
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }
  return res.status(200).json({
    status: 200,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  try {
    const result = await project.findOne({
      where: { id: projectId, createdBy: userId },
    });
    console.log("result: ", result);
    if (!result) {
      return next(new AppError("Invalid project id or user id", 400));
    }

    result.title = body.title;
    result.productImage = body.productImage;
    result.price = body.price;
    result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.productUrl = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;

    await result.save();
  } catch (err) {
    console.log("error: ", err);
  }
  return res.status(200).json({
    status: 200,
    message: "Project updated successfully",
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  try {
    const result = await project.findOne({
      where: { id: projectId, createdBy: userId },
    });
    console.log("result: ", result);
    if (!result) {
      return next(new AppError("Invalid project id or user id", 400));
    }

    await result.destroy();
  } catch (err) {
    console.log("error: ", err);
  }
  return res.status(200).json({
    status: 200,
    message: "Project deleted successfully",
  });
});

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
