const mongoose = require("mongoose");
const Campground = require("../models/campground")
const cities = require("./cities")
const villages = require("./cyVillages")
const { places, descriptors } = require("./seedHelpers");
const { required } = require("joi");

mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/Yelpcamp")
  .then(() => {
    console.log("connected yo db")
  })
  .catch(error => {
    console.log(error)
  })

const getRandomImage = () => {
  url = "https://source.unsplash.com/collection/483251"
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
  }).catch(function () {
    console.log("Booo");
  });
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 15; i++) {
    const random1000 = Math.floor(Math.random() * 30)
    priceRandom = Math.floor(Math.random() * 30) + 80
    const camp = new Campground({
      title: `${descriptors[Math.floor(Math.random() * places.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
      location: `${villages[random1000].village}, ${villages[random1000].district}`,
      geometry: {
        type: 'Point',
        coordinates: [villages[random1000].longitude, villages[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dzai2rayq/image/upload/v1696845423/pexels-photo-2662831_bz5tc1.jpg',
          filename: 'YelpCamp/pexels-photo-2662831_bz5tc1',
        },
        {
          url: 'https://res.cloudinary.com/dzai2rayq/image/upload/v1696845422/pexels-photo-2609954_kvc8rh.jpg',
          filename: 'YelpCamp/pexels-photo-2609954_kvc8rh',
        },
        {
          url: 'https://res.cloudinary.com/dzai2rayq/image/upload/v1696845380/pexels-photo-1539225_vc2cc8.jpg',
          filename: 'YelpCamp/pexels-photo-1539225_vc2cc8',
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

// {
//   "_id": {
//     "$oid": "651eeb6cb5b47335a65cfeee"
//   },
//   "title": "[REDUCTED] Fishing Camp",
//   "price": 99999,
//   "description": "this is the best fishing experience you will have in your pointless, miserable life.\r\nYou will learn the secret to catching BEEAAAAASTTTTTTTS with an ancient technique used by our ancestors called [redacted].",
//   "location": "[REDUCTED]",
//   "images": [
//     {
//       "url": "https://res.cloudinary.com/dzai2rayq/image/upload/v1696525164/YelpCamp/ufoybsacwvrebl7kuogl.jpg",
//       "filename": "YelpCamp/ufoybsacwvrebl7kuogl",
//       "_id": {
//         "$oid": "651eeb6cb5b47335a65cfeef"
//       }
//     },
//     {
//       "url": "https://res.cloudinary.com/dzai2rayq/image/upload/v1696525163/YelpCamp/tlw2fej4gep4yyzpcvci.png",
//       "filename": "YelpCamp/tlw2fej4gep4yyzpcvci",
//       "_id": {
//         "$oid": "651eeb6cb5b47335a65cfef0"
//       }
//     }
//   ],
//   "author": {
//     "$oid": "6509ca25e66e8833d329c120"
//   },
//   "__v": 2,
//   "geometry": {
//     "type": "Point",
//     "coordinates": [
//       "32.736389",
//       "34.874740"
//     ]
//   },
//   "reviews": [
//     {
//       "$oid": "6522c506155bb44fc34fa025"
//     },
//     {
//       "$oid": "6522c513155bb44fc34fa03b"
//     }
//   ]
// }