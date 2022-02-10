import camelize from "camelize";

import { firebaseFunctionHost, mockingData } from "../../config/env";

export const restaurantsRequest = (location) => {
  return fetch(
    `${firebaseFunctionHost}/placesNearby?location=${location}&mock=${mockingData}`
  ).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
