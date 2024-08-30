import { TwitterApi } from 'twitter-api-v2';
require('dotenv').config()

//Create new twitter client with oauth 1.0
const userClient = new TwitterApi({
    appKey: process.env.appKey,
    appSecret: process.env.appSecret,
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessSecret,
  });
  
//Create a write client
const writeClient = userClient.writeClient;

//Tweet
await writeClient.v2.tweet("Hello hedgehog!");