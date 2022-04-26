const post = require("../models/post.model");
const result = require("../helpers/response");
const { postValidate } = require("../helpers/validation");
const esService = require("./es.controller");
const { forEach } = require("lodash");
class PostController {
  async Search(req, res) {
    const searchText = req.query.text;
    const index = req.originalUrl.substring(1, 5);
    //console.log(await esService.delIndex(index));
    const es = await esService.search(index, searchText.trim());
    if (es.hits.hits.length === 0) {
      result.NOT_FOUND(res, "empty");
    }
    result.OK(res, es, "");
  }
  async List(req, res) {
    const data = await post.getAllPost();
    if (data.length === 0) {
      result.NOT_FOUND(res, "list is empty");
    }
    result.OK(res, es.hits.hits, "");
  }

  async Detail(req, res) {
    const data = await post.getPostById(req.params.id);
    if (data.length === 0) {
      result.NOT_FOUND(res, `Not post have id=${req.params.id}`);
    } else result.OK(res, data, "");
  }

  async Create(req, res) {
    const { error } = postValidate(req.body);
    if (error) return result.BAD_REQUEST(res, error[0].message);
    const index = req.originalUrl.substring(1, 5);
    try {
      let i = 0;
      // for (; i < 500; i++) {
      //   req.body.authorID = i + 1;
      //   await esService.index(index, req.body);
      // }
      await esService.index(index, req.body);
      const data = await post.addPost(req.body);
      if (req.body) {
        result.OK(res, data, "CREATED");
      } else {
        result.BAD_REQUEST(res, data.sqlMessage);
      }
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }

  async Update(req, res) {
    const { error } = postValidate(req.body);
    if (error) return result.BAD_REQUEST(res, error.details[0].message);
    try {
      const data = await post.updatePost(req.params.id, req.body);
      result.OK(res, data, "UPDATED");
    } catch (error) {
      console.log(error);
      result.BAD_REQUEST(res, error);
    }
  }

  async Delete(req, res) {
    try {
      const data = await post.deletepostById(req.params.id);
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
module.exports = new PostController();
