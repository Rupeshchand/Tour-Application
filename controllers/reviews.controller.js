import Reviews from "../models/reviews.model.js";
export const createReview = async (req, res, next) => {
  const user = req.userId;
  console.log(user);
  const userToken = req.headers.authorization;
  console.log(userToken);
};
