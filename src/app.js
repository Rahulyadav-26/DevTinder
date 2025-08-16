const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //ENCRYPT THE PASSWORD

  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("PassWord Hash: ", passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error adding user " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //CREATE A JWT TOKEN

      const token = await jwt.sign({ _id: user._id }, "DevTinderSecretKey" , {expiresIn: "0d"});
      console.log(token);

      //ADD THE TOKEN TO COOKIE AND SEND THE RESPONSE BACK TO USER

      res.cookie("authToken", token);

      res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).send({ error: "Error during login: " + error.message });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

app.post("/sendConnectionRequest" , userAuth , (req , res) => {
  const user = req.user;
   
  console.log("Connection request sent from user: ", user._id);

  res.send("Connection request sent by user " + user.firstName);
})

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
