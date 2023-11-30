import { GET_DONATIONS, GET_PETS } from "./actionTypes";

export const getPets = (params) => ({
  type: GET_PETS,
  params,
});

export const getDonations = () => ({
  type: GET_DONATIONS,
});
