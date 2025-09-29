//Middleware para validar el cuerpo (body) de una solicitud HTTP
export const validateBody = (schema) => {
    //Retorna una función middleware que Express ejecutará al recibir una solicitud
    return (req, res, next) => {
        //Valida req.body contra el esquema proporcionado
        //{ abortEarly: false } permite mostrar todos los errores, no solo el primero
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        //Si hay errores de validación, responde con código 400 y los detalles de los errores
        if(error){
            return res.status(400).json({
                //Mapea los errores y devuelve solo los mensajes, no toda la estructura de Joi
                errors: error.details.map(d => d.message)
            });
        }
        //Si no hay errores, reemplaza req.body con el valor validado. Esto es útil porque Joi puede aplicar valores por defecto o transformar datos, tener cuidado de nunca poner req = abc ya que se pierden los demas datos del request
        req.body = value;
        //Llama al siguiente middleware o controlador
        next();
    };
};

//Middleware para validar los parámetros (params) de la URL
export const validateParams = (schema) => {
    return (req, res, next) => {
        //Valida req.params contra el esquema proporcionado
        const { error, value } = schema.validate(req.params, { abortEarly: false });
        //Si hay errores, responde con código 400 y los mensajes de error
        if(error){
            return res.status(400).json({
                errors: error.details.map(d => d.message)
            });
        }
        //Si no hay errores, se reemplazan los parámetros con la versión validada
        req.params = value;
        //Continúa con el siguiente middleware/controlador
        next();
    };
};