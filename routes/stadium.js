const express = require("express");

const router = express.Router();

const Stadium = require("../model/Stadium");
const User = require("../model/User");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/user/one", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    if (!username || !email || !password) {
      res.json({ message: "missing parameters" });
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        token: token,
        salt: salt,
        hash: hash,
      });

      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

router.post("/user/list", async (req, res) => {
  try {
    const listUser = await User.findOne({
      email: req.body.email,
      username: req.body.username,
    });
    if (
      req.body.username !== listUser.username ||
      req.body.email !== listUser.email
    ) {
      res.json({ message: "request failed" });
    } else {
      res.json(listUser);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/user/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    if (!req.body.id) {
      return res.json({ message: "missing id" });
    }
    if (req.body.id) {
      return res.json({ message: "user deleted" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
