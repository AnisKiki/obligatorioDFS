import Joi from "joi"

export const validateCreate = Joi.object({
    titlee: Joi.string().min(3).max(40).required(),
    authors: Joi.string().min(3).max(40).required(),
    publishedDate: Joi.date().min("1800-01-01").max("now").required(),
    description: Joi.string().min(3).max(40).required(),
    categories: Joi.string().min(3).max(40).required()
});
export const validateDelete = Joi.object({
    id: Joi.string().hex().length(24).required()
});