import Joi from "joi"
const MinFechLibro = "01-01-0001";

export const validateCreate = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    authors: Joi.string().min(3).max(40).required(),
    // publishedDate: Joi.date().min(MinFechLibro).max("now").required(),
    description: Joi.string().min(3).max(1000).required(),
    categories: Joi.string().min(3).max(40).required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio",
    "date.base": "El campo {#label} debe ser una fecha válida",
    "date.min": "El campo {#label} debe ser posterior a {#limit}",
    "date.max": "El campo {#label} debe ser anterior o igual a la fecha actual"
});
export const validateUpdate = Joi.object({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(40).required(),
    authors: Joi.string().min(3).max(40).required(),
    // publishedDate: Joi.date().min(MinFechLibro).max("now").required(),
    description: Joi.string().min(3).max(1000).required(),
    categories: Joi.string().min(3).max(40).required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio",
    "date.base": "El campo {#label} debe ser una fecha válida",
    "date.min": "El campo {#label} debe ser posterior a {#limit}",
    "date.max": "El campo {#label} debe ser anterior o igual a la fecha actual"
});
export const validateDelete = Joi.object({
    id: Joi.string().hex().length(24).required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio",
});

export const validateUpdateParams = Joi.object({
    id: Joi.string().hex().length(24).required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "any.required": "El campo {#label} es obligatorio",
});

export const validateUpdateBody = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    authors: Joi.string().min(3).max(40).required(),
    // publishedDate: Joi.date().min(MinFechLibro).max("now").required(),
    description: Joi.string().min(3).max(1000).required(),
    categories: Joi.string().min(3).max(40).required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "any.required": "El campo {#label} es obligatorio",
    "date.base": "El campo {#label} debe ser una fecha válida",
    "date.min": "El campo {#label} debe ser posterior a {#limit}",
    "date.max": "El campo {#label} debe ser anterior o igual a la fecha actual"
});