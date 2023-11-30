const AWS = require("./AWS");
const sns = new AWS.SNS();

const createTopic = async (email, id) => {
  try {
    const createTopicResponse = await sns.createTopic({ Name: id }).promise();

    const topicArn = createTopicResponse.TopicArn;

    const subscribeResponse = await sns
      .subscribe({
        Protocol: "email",
        TopicArn: topicArn,
        Endpoint: email,
      })
      .promise();
    console.log(subscribeResponse.SubscriptionArn);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendEmail = async (id, message) => {
  const { Topics } = await sns.listTopics().promise();

  const targetTopic = Topics.filter((topic) => topic.TopicArn.includes(id))[0];

  const params = {
    Message: message,
    TopicArn: targetTopic.TopicArn,
  };

  await sns.publish(params).promise();
};

module.exports = { sendEmail, createTopic };
