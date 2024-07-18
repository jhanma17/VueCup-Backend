import User from "../user/userModel.js";
import auth from "../../firebase-config";

const signUp = async (req, res) => {
  const { name, token } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(token);

    //Evaluar si el email existe
    const user = await User.findOne({ email: decodedToken.email });

    if (user) {
      return res.status(400).json({
        mensaje: "The email is already registered",
      });
    }

    //Registrar el usuario
    const createdUser = await User.create({
      name,
      email: decodedToken.email,
      loginType: "EMAIL",
    });

    return res.json({ user: createdUser, token });
  } catch (error) {
    return res.status(500).json({
      mensaje: "An error has occurred",
      error,
    });
  }
};

const login = async (req, res) => {
  const { token, type } = req.body;
  try {
    const decodedToken = await auth.verifyIdToken(token);

    //Evaluar si el email existe
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      try {
        //Registrar el usuario
        const createdUser = await User.create({
          name: decodedToken.name || decodedToken.email.split("@")[0],
          email: decodedToken.email,
          loginType: type,
        });

        return res.json({ user: createdUser, token });
      } catch (error) {
        return res.status(500).json({
          mensaje: "An error has occurred",
          error,
        });
      }
    } else {
      if (user.loginType !== type) {
        return res.status(400).json({
          mensaje: "The email is already registered",
        });
      }
    }

    return res.json({ user, token });
  } catch (error) {
    return res.status(500).json({
      mensaje: "An error has occurred",
      error,
    });
  }
};

module.exports = { login, signUp };
