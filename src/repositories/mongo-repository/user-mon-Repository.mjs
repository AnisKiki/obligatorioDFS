//Importamos el modelo de usuario definido con Mongoose
import User from "../../model/user.mjs";

//Objeto que contiene funciones para interactuar con la base de datos MongoDB
const userMongoRepository = {
    //Obtener todos los usuarios almacenados en la colección
    async getAll() {
        return await User.find();
    },
    //Obtener un usuario específico por su ID
    async getUserById(data) {
        return User.findById(data).select("-password");
    },
    //Buscar un usuario por su dirección de correo electrónico. necesitamos el usuario con su password
    async getUserByEmail(data) {
        console.log('data', data)
        return User.findOne(data);
    },
    //Crear un nuevo usuario con los datos proporcionados
    async createUser(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            console.log('No se pudo crear el usuario en mongo', error)
        }
    },
    //Actualizar los datos de un usuario por su ID
    //El parámetro { new: true } indica que se devuelva el documento actualizado
    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    },
    // Eliminar un usuario por su ID
    async remove(id) {
        return await User.findByIdAndDelete(id);
    },
    async getUsers(data){
        User.findOneAndReplace(id, data, {
            new: true, runValidators: true
        })
    }
};

// Exportamos el repositorio para poder utilizarlo en otras partes de la aplicación
export default userMongoRepository;