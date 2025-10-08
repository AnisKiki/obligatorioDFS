import Book from "../../model/book.mjs";

const bookMongoRepository = {
    async getAll() { //Si es de todos los libros, entonces usamos este, si es unicamente libros del usuario es getBooksByUser
        try {
        return await Book.find();
        } catch (error) {
            throw error;
        }
    },
    async getBooksByUser(userId) {
        try {
            return await Book.find({ userId });
        } catch (error) {
            throw error;
        }
    },
    async getBookByTitleAndAuthor(title, authors) {
        console.log('title:', title, 'authors:', authors)
        try {
            return await Book.findOne({ title, authors });
        } catch (error) {
            throw error;
        }
    },
    async getBookById(id) {
        try {
            return await Book.findById(id);
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            return await Book.findByIdAndUpdate(id,
                data, {
                    new: true,
                    runValidators: true
                });
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            
            const book = new Book(data)
            const bookCreado = await book.save();
            return bookCreado;
        } catch (error) {
           throw error;
        }
    },
    async delete(id) {
        return await Book.findByIdAndDelete(id);
    },
};
export default bookMongoRepository;