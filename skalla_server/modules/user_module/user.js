const User = require("../user_module/user_model.js");

class userQuery {
  constructor() {}
  async getUserById(userId) {
    return await User.findOne({ _id: userId });
  }
}
module.exports = new userQuery();
