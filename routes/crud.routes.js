const express = require("express");
const crudRouter = express.Router();

const {
  getObj,
  updateObj,
  deleteObj,
  createObj,
} = require("../controllers/crud.controllers");

crudRouter.route("/:id").get(getObj).put(updateObj).delete(deleteObj);
crudRouter.route("/").post(createObj);

module.exports = {
  crudRouter,
};
