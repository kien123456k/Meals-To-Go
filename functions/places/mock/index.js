const antwerp = require("./antwerp");
const chicago = require("./chicago");
const toronto = require("./toronto");
const san_francisco = require("./san_francisco");

module.exports.mocks = {
  "51.219448,4.402464": antwerp,
  "43.653225,-79.383186": toronto,
  "41.878113,-87.629799": chicago,
  "37.7749295,-122.4194155": san_francisco,
};

const mockImages = [
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436769/Meals%20To%20Go/mock_place_image_1.jpg",
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436770/Meals%20To%20Go/mock_place_image_2.jpg",
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436771/Meals%20To%20Go/mock_place_image_3.jpg",
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436772/Meals%20To%20Go/mock_place_image_4.jpg",
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436773/Meals%20To%20Go/mock_place_image_5.jpg",
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436774/Meals%20To%20Go/mock_place_image_6.jpg",
  "https://res.cloudinary.com/dq7l8216n/image/upload/v1644436983/Meals%20To%20Go/mock_place_image_7.jpg",
];

module.exports.addMockImage = (restaurant) => {
  const randomImage =
    mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
  restaurant.photos = [randomImage];
  return restaurant;
};
