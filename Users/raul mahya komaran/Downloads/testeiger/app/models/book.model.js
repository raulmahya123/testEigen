module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            code: String,
            title: String,
            author: String,
            stock: Number,
        }
    );
    const Book = mongoose.model("book", schema);
    return Book;
};
