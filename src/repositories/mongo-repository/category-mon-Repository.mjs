import Category from "../../model/category.mjs";

const categoryMongoRepository = {
    async getAll() {
        try {
            return await Category.find();
        } catch (error) {
            throw error;
        }
    },
    async getCategoryById(id) {
        try {
            return await Category.findOne({ _id: id });
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const category = new Category(data);
            const categoryCreated = await category.save();
            return categoryCreated;
        } catch (error) {
            throw error;
        }
    },
};
export default categoryMongoRepository;