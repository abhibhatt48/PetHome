const AWS = require("./AWS");
const { fetchFileExtension } = require("./functions");

const s3 = new AWS.S3();
const Bucket = "pet-pic-asdf";

const uploadImage = async (key, file) => {
  const params = {
    Bucket,
    Key: key + fetchFileExtension(file.originalname),
    Body: file.buffer,
  };
  return await s3.upload(params).promise();
};

const getImage = async (key) => {
  const params = {
    Bucket,
    Key: key,
  };
  return await s3.getObject(params).promise();
};

module.exports = { uploadImage, getImage };
