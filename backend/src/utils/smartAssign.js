import { Task } from "../models/task.model.js";
import { User } from "../models/users.model.js";

const smartAssign = async () => {
  const users = await User.find();
  const userTasks = await Promise.all(
    users.map(async (user) => {
      const count = await Task.countDocuments({
        assignedTo: user._id,
        status: { $ne: "completed" },
      });
      return { user, count };
    })
  );
  userTasks.sort((a, b) => a.count - b.count);
  return userTasks[0].user;
};

export default smartAssign;
