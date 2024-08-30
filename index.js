import { CategoryChannel } from 'discord.js';
import { TwitterApi } from 'twitter-api-v2';

//Create new twitter client with oauth 1.0
const userClient = new TwitterApi({
    appKey: 'consumerAppKey',
    appSecret: 'consumerAppSecret',
    accessToken: 'accessOAuthToken',
    accessSecret: 'accessOAuthSecret',
  });
  
//Create a write client
const writeClient = userClient.writeClient;

//Tweet
await userClient.v2.tweet("Hello hedgehog!");



  