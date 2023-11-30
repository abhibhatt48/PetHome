const AWS = require("./AWS");

const cloudFront = new AWS.CloudFront();

const fetchCloudFormationUrl = async (key) => {
  const listOfDistributions = await cloudFront.listDistributions().promise();
  const firstDistribution = listOfDistributions.DistributionList.Items[0];
  const name = firstDistribution.DomainName;
  return "https://" + name + "/" + key;
};

module.exports = fetchCloudFormationUrl;
