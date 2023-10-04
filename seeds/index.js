const mongoose = require("mongoose");
const Campground = require("../models/campground")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")

mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/Yelpcamp")
    .then(() => {
        console.log("connected yo db")
    })
    .catch(error => {
        console.log(error)
    })

const getRandomImage = () => {
    url = "https://source.unsplash.com/collection/483251"
    fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      }).catch(function() {
        console.log("Booo");
      });
}

const seedDB = async () => {
    await Campground.deleteMany({});
    const c = new Campground({ title: "purple field" })
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        priceRandom = Math.floor(Math.random() * 30) + 80
        // randomImage = getRandomImage()
        const camp = new Campground({
            title: `${descriptors[Math.floor(Math.random() * places.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dzai2rayq/image/upload/v1696352482/YelpCamp/nafidhj8cqevwmcnyndn.jpg',
                  filename: 'YelpCamp/nafidhj8cqevwmcnyndn',
                },
                {
                  url: 'https://res.cloudinary.com/dzai2rayq/image/upload/v1696352483/YelpCamp/s85dsbsplhjo80uvxdbw.jpg',
                  filename: 'YelpCamp/s85dsbsplhjo80uvxdbw',
                }
              ],
            author: "6509ca25e66e8833d329c120",
            price: priceRandom,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero praesentium iste rerum asperiores hic perspiciatis saepe facere voluptas recusandae molestiae"
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})