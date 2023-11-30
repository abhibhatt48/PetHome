const { addUser, findUserByEmail } = require("../db/UserQueries");
const {
  hashPassword,
  comparePassword,
  generateRandomString,
} = require("../utils/functions");
const { genrateResponse } = require("../utils/functions");
const { AppError } = require("../utils/errors");
const { generate } = require("../middleware/Authentication");
const { createTopic } = require("../utils/sns");

const router = require("express").Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user[0]) {
    throw new AppError(200, "User dosen't exist");
  }

  const isPasswordTrue = await comparePassword(password, user[0].password);
  if (!isPasswordTrue) {
    throw new AppError(200, "Invalid Credentials");
  }
  return genrateResponse(res, 200, true, {
    token: await generate(user[0].email),
    email,
  });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user[0]) {
    throw new AppError(200, "User already exist");
  }

  const hashed = await hashPassword(password);
  const id = generateRandomString(10);
  await addUser(email, hashed, id);
  await createTopic(email, id);

  return genrateResponse(res, 200, true);
});

module.exports = router;
