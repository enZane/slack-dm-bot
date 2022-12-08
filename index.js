const { WebClient } = require("@slack/client");

const slackToken = "YOUR_TOKEN";
const web = new WebClient(slackToken);

async function sendDirectMessage(userId,  message) {
  const res = await web.conversations.open({ users: userId });

  const conversationId = res.channel.id;

  await web.chat.postMessage({
    channel: conversationId,
    text: message,
  });

  console.log(`Successfully sent message to user ${userId}`);
}

async function getUserIdByEmail(email) {
  const response = await web.users.lookupByEmail({
    email,
  });

  if (!response.ok) {
    throw new Error(`Error getting user list: ${response.error}`);
  }

  const { user } = response;
  if (!user) {
    throw new Error(`Could not find user with username "${username}"`);
  }
  return user.id;
}

async function run() {
  try {
    const userId = await getUserIdByEmail("THE EMAIL ADDRESS");
    const message = "Your request has been accepted from request bot";

    sendDirectMessage(userId, message);
  } catch (error) {
    console.log(error);
  }
}

run();
