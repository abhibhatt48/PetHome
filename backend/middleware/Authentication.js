const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../db/UserQueries");
const { AppError } = require("../utils/errors");

function verify(req, res, next) {
  try {
    if (!req.headers.authorization)
      throw new AppError(401, "Unauthorized Access");
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!token) {
      throw new AppError(401, "Unauthorized Access");
    }

    jwt.verify(token, "asdfasdfasdfasdf", async function (err, decoded) {
      try {
        if (err) {
          console.log(err);
          throw new AppError(401, err.message);
        } else {
          const data = await findUserByEmail(decoded.email);
          req.user = data[0];
          next();
        }
      } catch (err) {
        const { statusCode, message } = err;
        res.status(statusCode || 500).json({
          status: "error",
          statusCode: statusCode || 500,
          message: statusCode === 500 ? "An error occurred" : message,
        });
      }
    });
  } catch (error) {
    throw new AppError(401, error.message || "Unauthorized access");
  }
}

function generate(email) {
  const token = jwt.sign({ email }, "asdfasdfasdfasdf", {
    expiresIn: "30d",
  });
  return token;
}

module.exports = {
  generate,
  verify,
};
