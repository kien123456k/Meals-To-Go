import camelize from "camelize";

import { firebaseFunctionHost, mockingData } from "../../config/env";

export const locationRequest = (searchTerm) => {
  return fetch(
    `${firebaseFunctionHost}/geocode?city=${searchTerm}&mock=${mockingData}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
