const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3();
const Rekognition = new AWS.Rekognition();
const TableName = "pets";

const updatePet = async (id, search) => {
  const params = {
    TableName,
    Key: {
      id,
    },
    UpdateExpression: "SET #search = :search",
    ExpressionAttributeNames: {
      "#search": "search",
    },
    ExpressionAttributeValues: {
      ":search": search,
    },
    ReturnValues: "ALL_NEW",
  };

  return new Promise((resolve, reject) => {
    DynamoDB.update(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.handler = async (event) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const imageS3Key = event.Records[0].s3.object.key;
  const image = await S3.getObject({
    Bucket: bucketName,
    Key: imageS3Key,
  }).promise();

  const { Labels } = await Rekognition.detectLabels({
    Image: {
      Bytes: image.Body,
    },
    MaxLabels: 5,
    MinConfidence: 50,
  }).promise();

  const Tags = Labels.map((label) => label.Name);

  const d = await updatePet(imageS3Key, Tags);

  const response = {
    statusCode: 200,
    body: d,
  };
  console.log(response);
  return response;
};
