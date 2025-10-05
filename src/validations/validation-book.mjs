import Joi from "joi"
const MinFechLibro = "01-01-1800";

export const validateCreate = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    authors: Joi.string().min(3).max(40).required(),
    publishedDate: Joi.date().min(MinFechLibro).max("now").required(),
    description: Joi.string().min(3).max(1000).required(),
    categories: Joi.string().min(3).max(40).required()
});
export const validateUpdate = Joi.object({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(40).required(),
    authors: Joi.string().min(3).max(40).required(),
    publishedDate: Joi.date().min(MinFechLibro).max("now").required(),
    description: Joi.string().min(3).max(1000).required(),
    categories: Joi.string().min(3).max(40).required()
});
export const validateDelete = Joi.object({
    id: Joi.string().hex().length(24).required()
});