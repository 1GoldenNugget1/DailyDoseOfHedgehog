import fs from 'fs'
import https from 'https'
import fetch from 'node-fetch'
import dotenv from 'dotenv';
dotenv.config()

let pixabayKey = process.env.pixabayKey;

//Page counter
let i = 1

//Browse through pages until error (no next page)
while(true) {
    let url = `https://pixabay.com/api/?key=${pixabayKey}&q=hedgehog&image_type=photo&page=${i}&per_page=200`;

    const response = await fetch(url);

    //If page doesn't exist stop the loop
    if(!response.ok) {
        break;
    }

    //Get data
    const data = await response.json();
    const hits = data["hits"];

    //Download each photo
    hits.forEach(hit => {
        let filename = `${hit["id"]}.jpg`;
        let fileURL = `${hit["largeImageURL"]}`
        
        const file = fs.createWriteStream(`img/${filename}`);
        https.get(fileURL, function(response) {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
            });
        });
    });

    console.log(`Page ${i} Done!`);

    i++;
}