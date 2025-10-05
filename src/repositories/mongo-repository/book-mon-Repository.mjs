import Book from "../../model/book.mjs";

const bookMongoRepository = {
    async getAll() { //Si es de todos los libros, entonces usamos este, si es unicamente libros del usuario es getBooksByUser
        return await Book.find();
    },
    async getBooksByUser(userId) {
        return await Book.find({ userId });
    },
    async getBookByTitleAndAuthor(title, authors) {
        console.log('title:', title, 'authors:', authors)
        return await Book.findOne({ title, authors });
    },
    async getBookById(id) {
        return Book.findById(id);
    },
    async update(id, data) {
        return await Book.findByIdAndUpdate(id, 
        data, { 
            new: true,
            runValidators: true 
        });
    },
    async create(data) {
        try {
            console.log('Creating book with data:', data);
            const book = new Book(data)
            const bookCreado = await book.save();
            /* delete bookCreado._doc.password; */
            return bookCreado;
        } catch (error) {
            console.log('No se pudo crear el libro en mongo', error)
        }
    },
    async delete(id) {
        return await Book.findByIdAndDelete(id);
    },
};

export default bookMongoRepository;