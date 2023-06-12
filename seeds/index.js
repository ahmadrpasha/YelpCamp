const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '6478e6a6b72b78f1602e1728',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nam perferendis quae a. Repellat id consequuntur autem eaque unde, veritatis iusto molestias magnam laboriosam deleniti amet dignissimos, doloribus iure delectus.',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dyjwzfgm3/image/upload/v1686092065/YelpCamp/uoib1xvwcyahgpvhhffv.jpg',
                  filename: 'YelpCamp/uoib1xvwcyahgpvhhffv',
                },
                {
                  url: 'https://res.cloudinary.com/dyjwzfgm3/image/upload/v1686092066/YelpCamp/od5g1fpdvknmgyu7ntk6.jpg',
                  filename: 'YelpCamp/od5g1fpdvknmgyu7ntk6',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})