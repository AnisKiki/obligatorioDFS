import Joi from "joi"

export const validateCreate = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string().min(3).max(20).required(),
});