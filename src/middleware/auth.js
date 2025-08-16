const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;


    const { authToken } = cookies;

    if(!authToken){
        throw new Error("No authentication token provided");
    }

    const decodedObj =  jwt.verify(authToken, "DevTinderSecretKey");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Authentication failed: " + error.message });
  }
};

module.exports = { userAuth };