import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fs from 'fs'
import date from 'date-and-time';
dotenv.config()

//setting up new date 
const now = new Date();
let formattedDate = date.format(now, 'ddd, MMM DD YYYY HH:mm:ss');

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

//If list exists remove deleted files
if (fs.existsSync('deletedImages.txt')) {
  let deletedFiles = fs.readFileSync('deletedImages.txt').toString().split("\n");

  files = files.filter( function( el ) {
    return deletedFiles.indexOf( el ) < 0;
  } );
};

let randomFile = "img/"+files[Math.floor(Math.random() * files.length)];

//Upload image to Twitter and get its ID
const mediaId = await userClient.v1.uploadMedia(randomFile);
//Post a tweet with image's ID
await userClient.v2.tweet(`🦔 ${formattedDate}`, {media: {media_ids: [mediaId]}});

