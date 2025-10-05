import Category from "../../model/category.mjs";

const categoryMongoRepository = {
    async getAll() {
        return await Category.find();
    },
    async getCategoryById(id) {
        console.log('id', id)
        return await Category.findOne({ _id: id });
    },
};

export default categoryMongoRepository;