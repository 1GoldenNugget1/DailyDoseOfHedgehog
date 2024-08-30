import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fs from 'fs'
dotenv.config()

//Create new twitter client with oauth 1.0
const userClient = new TwitterApi({
    appKey: process.env.appKey,
    appSecret: process.env.appSecret,
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessSecret,
  });
  
//Create a write client
const writeClient = userClient.writeClient;

//Get random image from directory
let files = fs.readdirSync(`img/`);
let randomFile = "img/"+files[Math.floor(Math.random() * files.length)];

//Upload image to Twitter and get its ID
const mediaId = await userClient.v1.uploadMedia(randomFile);
//Post a tweet with image's ID
await userClient.v2.tweet("🦔", {media: {media_ids: [mediaId]}});