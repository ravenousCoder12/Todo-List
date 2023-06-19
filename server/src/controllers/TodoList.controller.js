import User from "../models/User.js";
import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Todo from "../models/Todo.js";

export const GetTodos = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    const list = await Todo.find({ userId: req.userId });
    console.log(list);

    return res.json(
      jsonGenerate(statusCode.SUCCESS, "ALL Todo Lists are here", {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        todos: list,
      })
    );
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};
