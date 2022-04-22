const category = require("../models/category.model");
const result = require("../helpers/response");
const { categoryValidate } = require("../helpers/validation");
const {index,search}= require("./es.controller")
class CategoryController {
  async List(req, res) {
    try {
      const data = await category.getAllCategory();
      if (data.length === 0) {
        result.NOT_FOUND(res, "list is empty");
      }
      result.OK(res, data, "");
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }
  async Detail(req, res) {
    try {
      const data = await post.category.getcategoryById(req.params.id);
      if (data.length === 0) {
        result.NOT_FOUND(res, `Not found category have id=${req.params.id}`);
      } else result.OK(res, data);
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }
  async Create(req, res) {
    const { error } = categoryValidate(req.body);
    if (error) return result.BAD_REQUEST(res, error.details[0].message);
    try {
      const data = await category.addcategory(req.body);
      index('post',req.body)
      if (data[0].affectedRows === 0) {
        result.BAD_REQUEST(res, "create unsuccess");
      }
      result.OK(res, req.body, "CREATED");
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }
  async Update(req, res) {
    const { error } = categoryValidate(req.body);
    if (error) return result.BAD_REQUEST(res, error.details[0].message);
    try {
      const data = await category.updatecategory(req.params.id, req.body);
      result.OK(res, data, "UPDATED");
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }
  async Delete(req, res) {
    try {
      const data = await category.deletecategoryById(req.params.id);
      if (data[0].affectedRows === 0) {
        result.BAD_REQUEST(res, "Delete unsuccess");
      }
      result.OK(res, "", "DELETED");
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }
}
module.exports = new CategoryController();
