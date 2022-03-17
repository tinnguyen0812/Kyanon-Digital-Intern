const db = require("../config/connect");
const query = db.promise();
const post = {
  async getAllPermission() {
    try {
      const list = await query.query("Select * from permission");
      return list[0];
    } catch (error) {
      console.log(error);
    }
  },
  async getPermissionByUser(id) {
    try {
      const permission = await query.query(
        "select resource,action from permission join user_permission on permission_id=permission.id  where user_id=?",
        [id],
      );
      return permission[0];
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async addPermission(object) {
    try {
      const result = await query.query(
        "insert into user_permission(user_id,permission_id) values(?,?)",
        [object.user_id, object.permiss_id],
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async updatePermission(id, object) {
    try {
      const result = await query.query(
        "update user_permission set permission_id=? where user_id=?",
        [object.permission, id],
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async deletePermission(id) {
    const post = await query
      .query("delete from user_permission where permission_id=?", [id])
      .catch((err) => {
        throw err;
      });
    return post;
  },
};
module.exports = post;
