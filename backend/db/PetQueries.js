const DynamoDB = require("./DynamoDB");

const TableName = "pets";

const addPet = async (data) => {
  return await DynamoDB.put({
    TableName,
    Item: {
      ...data,
      adoptedBy: "",
    },
  }).promise();
};

const getPets = async () => {
  const result = await DynamoDB.scan({ TableName }).promise();

  return result.Items;
};

const getPetById = async (id) => {
  const params = {
    TableName,
    FilterExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id,
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

const getPetByUser = async (email) => {
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

const updatePetAdoptionRequest = async (id, requestedBy) => {
  const updateParams = {
    TableName,
    Key: {
      id,
    },
    UpdateExpression: "SET #requestedBy = :requestedBy",
    ExpressionAttributeNames: {
      "#requestedBy": "requestedBy",
    },
    ExpressionAttributeValues: {
      ":requestedBy": requestedBy,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await DynamoDB.update(updateParams).promise();
  return result.Attributes;
};
const updatePet = async (id, adopted, adoptedBy) => {
  console.log(adoptedBy);
  const updateParams = {
    TableName,
    Key: {
      id,
    },
    UpdateExpression: "SET #adopted = :adopted, #adoptedBy = :adoptedBy",
    ExpressionAttributeNames: {
      "#adopted": "adopted",
      "#adoptedBy": "adoptedBy",
    },
    ExpressionAttributeValues: {
      ":adopted": adopted,
      ":adoptedBy": adoptedBy,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await DynamoDB.update(updateParams).promise();
  return result.Attributes;
};

module.exports = {
  addPet,
  getPets,
  updatePet,
  getPetById,
  getPetByUser,
  updatePetAdoptionRequest,
};
