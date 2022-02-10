import createStripe from "stripe-client";

import { firebaseFunctionHost, stripePublicKey } from "../../config/env";

const stripe = createStripe(stripePublicKey);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${firebaseFunctionHost}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      console.log(JSON.stringify(res));
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
