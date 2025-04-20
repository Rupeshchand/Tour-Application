import rateLimit from "express-rate-limit"

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many requests try again after some time",
    headers : true
})
export default apiLimiter