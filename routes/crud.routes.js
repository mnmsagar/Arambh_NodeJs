const express = require("express");
const crudRouter = express.Router();
const { authenticateToken } = require("../middleware/jwt.authentication");

const {
  getObj,
  updateObj,
  deleteObj,
  createObj,
} = require("../controllers/crud.controllers");

crudRouter
  .route("/:id")
  .get(authenticateToken, getObj)
  .put(authenticateToken, updateObj)
  .delete(authenticateToken, deleteObj);
crudRouter.route("/").post(authenticateToken, createObj);

module.exports = {
  crudRouter,
};
