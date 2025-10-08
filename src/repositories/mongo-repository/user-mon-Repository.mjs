//Importamos el modelo de usuario definido con Mongoose
import User from "../../model/user.mjs";

//Objeto que contiene funciones para interactuar con la base de datos MongoDB
const userMongoRepository = {
    //Obtener todos los usuarios almacenados en la colección
    async getAll() {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    },
    //Obtener un usuario específico por su ID
    async getUserById(data) {
        try {
            return await User.findById(data).select("-password");
        } catch (error) {
            throw error;
        }
    },
    //Buscar un usuario por su dirección de correo electrónico. necesitamos el usuario con su password
    async getUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    },
    //Crear un nuevo usuario con los datos proporcionados
    async create(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            console.log('No se pudo crear el usuario en mongo', error) //ACAAAAAAAAAAAAAAAAAA
        }
    },
    
    //Actualizar los datos de un usuario por su ID
    //El parámetro { new: true } indica que se devuelva el documento actualizado
    async update(id, data) {
        try {
            return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
        } catch (error) {
            throw error;
        }
    },
    // Eliminar un usuario por su ID
    async remove(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    },
    async getUsers(data){
        try {
            return await User.findOneAndReplace(id, data, {
                new: true, runValidators: true
            });
        } catch (error) {
            throw error;
        }
    }
};
// Exportamos el repositorio para poder utilizarlo en otras partes de la aplicación
export default userMongoRepository;