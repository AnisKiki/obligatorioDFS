import bookRepository from "../../repositories/book-repository.mjs";
import "dotenv/config";

export async function createBook(req, res) {
    try {
        const { tittle, authors, publishedDate, description, categories } = req.body;

        const existing = await bookRepository.getbookByTitle(title); //Verificar si ya existe el titulo
        if (existing) return res.status(400).json({ message: "Libro ya existente" });

        const book = await bookRepository.create({  //Crear libro
            tittle, 
            authors, 
            publishedDate, 
            description, 
            categories
        });
        res.status(201).json({
            id: book._id, 
            title: book.title, 
            authors: book.authors, 
            publishedDate: book.publishedDate, 
            description: book.description, 
            categories: book.categories
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const book = await bookRepository.delete(id);
        if (!book) return res.status(404).json({ message: "Libro no encontrado" });
        res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}