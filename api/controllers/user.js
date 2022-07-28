import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, country, city, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { username, email, country, city, phone },
      },
      { new: true }
    );
    res.status(200).json({
      ...updatedUser._doc,
      password: "",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const { username, email, country, city, phone } = user._doc;
    res.status(200).json({username, email, country, city, phone});
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("username email country city phone img");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

