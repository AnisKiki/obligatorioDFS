import Category from "../../model/category.mjs";

const categoryMongoRepository = {
    async getAll() {
        return await Category.find();
    },
    async getCategoryById(id) {
        console.log('id', id)
        return await Category.findOne({ _id: id });
    },
    async create(data) {
        try {
            const category = new Category(data);
            const categoryCreated = await category.save();
            return categoryCreated;
        } catch (error) {
            console.log('No se pudo crear la categoría en mongo', error);
        }
    },
};
export default categoryMongoRepository;