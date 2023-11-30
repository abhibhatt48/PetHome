const DynamoDB = require("./DynamoDB");

const TableName = "users";

const addUser = async (email, password, id) => {
  return await DynamoDB.put({
    TableName,
    Item: {
      email: email,
      password: password,
      id: id,
    },
  }).promise();
};

const findUserByEmail = async (email) => {
  const params = {
    TableName,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  return new Promise((resolve, reject) => {
    DynamoDB.scan(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
};

module.exports = {
  addUser,
  findUserByEmail,
};
