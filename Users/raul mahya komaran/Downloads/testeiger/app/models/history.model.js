module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            code: String,
            title: String,
            author: String,
            stock: Number,
            code_name: String,
            name: String,
            pinjamnya:Number,
            borrowDate: Date,
            dueDate: Date,
            returnDate: Date,
        }
    );

    const History = mongoose.model("history", schema);
    return History;

};
