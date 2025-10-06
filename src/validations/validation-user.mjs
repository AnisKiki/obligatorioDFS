import Joi from "joi"

export const validateAuth = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    iat: Joi.number().integer(),
    exp: Joi.number().integer(),
    role: Joi.string().valid("user", "admin").required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio"
});

export const validateSingup = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string().min(3).max(20).required(),
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio"
});

export const validateLogin = Joi.object({
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string().min(3).max(20).required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio"
});

export const validateChangePlan = Joi.object({
    plan: Joi.string().valid("premium", "plus").required()
}).messages({
    "string.empty": "El campo {#label} es obligatorio",
    "string.pattern.base": "El campo {#label} debe ser un email válido",
    "any.required": "El campo {#label} es obligatorio"
}).required();