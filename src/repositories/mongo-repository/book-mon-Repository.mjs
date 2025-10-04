import Book from "../../model/book.mjs";

const bookMongoRepository = {
    async getAll() {
        return await Book.find();
    },
    async getbookByTitle(title) {
        console.log('title', title)
        return Book.findOne({ title });
    },
    async create(data) {
        try {
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