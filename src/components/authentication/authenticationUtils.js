import User from "../user/userModel";

import auth from "../../firebase-config";

const verifyToken = async (token) => {
  try {
    const decodedToken = await auth.verifyIdToken(token);

    const user = await User.findOne({ email: decodedToken.email });

    if (user) {
      return user._id;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  verifyToken,
};
