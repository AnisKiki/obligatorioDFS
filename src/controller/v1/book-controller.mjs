import bookRepository from "../../repositories/book-repository.mjs";
import categoryRepository from "../../repositories/category-repository.mjs";
import "dotenv/config";

export async function createBook(req, res) {
    try {
        console.log(req.body);
        const { title, authors, publishedDate, description, categories } = req.body;
        const user = req.user.id;
        const userPlan = req.user.plan;

        if (userPlan === "plus") {
            const userBooks = await bookRepository.getBooksByUser(userId);
            if (userBooks.length >= 10) {
                return res.status(403).json({
                    message: "Límite alcanzado: los usuarios Plus solo pueden crear hasta 10 libros"
                });
            }
        }

        const existing = await bookRepository.getBookByTitleAndAuthor(title, authors); //Verificar si ya existe el titulo
        if (existing) return res.status(400).json({ message: "Libro ya existente" });

        const category = await categoryRepository.getCategoryById(categories); //Verificar si la categoría existe
        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });

        const book = await bookRepository.create({  //Crear libro
            title, 
            authors, 
            publishedDate, 
            description, 
            userId: user,
            categories
        });
        res.status(201).json({
            id: book._id, 
            code: book.code,
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
export async function getListOfBooks(req, res) {
    try {
        console.log(req);
        const books = await bookRepository.getBooksByUser(req.user.id); //depende de si es todos los libros o los del usuario
        if (!books || books.length === 0) return res.status(200).json({ message: "El usuario no tiene libros" });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function getBookDetails(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const book = await bookRepository.getBookById(id);

        if (!book) return res.status(404).json({ message: "Libro no encontrado" });
        if (book.userId.toString() !== userId) return res.status(403).json({ message: "No autorizado para ver este libro" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function editBook(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const book = await bookRepository.getBookById(id);

        if (!book) return res.status(404).json({ message: "Libro no encontrado" });
        if (book.userId.toString() !== userId) return res.status(403).json({ message: "No autorizado para editar este libro" });

        const bookUpd = await bookRepository.update(req.params.id, req.body);
        res.status(200).json("Libro editado exitosamente", bookUpd);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const book = await bookRepository.getBookById(id); 
        if (!book) return res.status(404).json({ message: "Libro no encontrado" });
        if (book.userId.toString() !== userId) return res.status(403).json({ message: "No autorizado para eliminar este libro" });

        await bookRepository.delete(id);
        res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}