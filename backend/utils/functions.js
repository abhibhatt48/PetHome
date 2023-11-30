const bcrypt = require("bcryptjs");

const genrateResponse = (res, statusCode, success, data) => {
  return res.status(statusCode).json({ success, data });
};

const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => hashedPassword);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash).then((result) => result);
  s;
};

const fetchFileExtension = (fileName) => {
  const splittedName = fileName.split(".");
  const fileExtension = splittedName[splittedName.length - 1].toLowerCase();
  return "." + fileExtension;
};

const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

module.exports = {
  genrateResponse,
  hashPassword,
  comparePassword,
  fetchFileExtension,
  generateRandomString,
};
