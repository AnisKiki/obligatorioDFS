import Joi from 'joi';

//Mediante joi se definen esquemas de validacion en este caso para el parametro. Esta validacion se podria usar en delete por ejemplo que recibe un parametro
export const idParamSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
});
//Validacion para el body, notar que se da un valor por defecto a completed en caso de no ser recibido como parte del body.
export const newToDoSchema = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    completed: Joi.boolean().default(false).required(),
    userId: Joi.number().integer().required()
});