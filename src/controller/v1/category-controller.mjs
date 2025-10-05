import categoryRepository from "../../repositories/category-repository.mjs";
import "dotenv/config";

export async function getListOfCategories(req, res) {
    try {
        const category = await categoryRepository.getAll();
        if (!category || category.length === 0) return res.status(200).json({ message: "No existen categorias por el momento" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}