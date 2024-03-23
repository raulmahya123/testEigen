
const db = require("../models");
const Member = db.Member;
const Book = db.Book;
const History = db.History;
const moment = require('moment');
exports.borrowBook = async (req, res) => {
    const memberId = req.params.memberId;
    const bookId = req.params.bookId;

    try {
        const member = await Member.findById(memberId);
        const book = await Book.findById(bookId);
        const maxBorrowLimit = 2; // Maximum number of books a member can borrow

        if (!member) {
            return res.status(404).send({ message: "Member not found." });
        }

        if (!book) {
            return res.status(404).send({ message: "Book not found." });
        }

        const memberHistory = await History.find({ member: member.code, name: book.title });
        const memberBookCount = memberHistory.length;
        
        if (memberBookCount >= maxBorrowLimit) {
            return res.status(400).send({ message: "Member has reached the maximum borrow limit for this book." });
        }

        const findall = await History.find();
        const bookCounts = {};
        findall.forEach(history => {
            const name = history.name;
            bookCounts[name] = (bookCounts[name] || 0) + 1;
        });

        for (const name in bookCounts) {
            if ((name === "Fery" && bookCounts[name] >= maxBorrowLimit && member.name === "Fery") ||
                (name === "Putri" && bookCounts[name] >= maxBorrowLimit && member.name === "Putri") ||
                (name === "Angga" && bookCounts[name] >= maxBorrowLimit && member.name === "Angga")) {
                return res.status(400).send({ message: `Member ${name} has reached the maximum borrow limit for this book.` });
            }            
        }
        
        const existingBorrowedBook = await History.findOne({ code: book.code, returnDate: null });
        if (existingBorrowedBook) {
            return res.status(400).send({ message: "Book is already borrowed by another member." });
        }

        if (member.penalty) {
            return res.status(400).send({ message: "Member is currently being penalized." });
        }

        if (book.stock === 0) {
            return res.status(400).send({ message: "Book is out of stock." });
        }

        const historyRecord = await History.create({
            member: member.code,
            title: book.title,
            author: book.author,
            stock: book.stock,
            code: book.code,
            name: member.name,
            pinjamnya: book.stock,
            borrowDate: new Date(),
            returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        });

        book.stock--;
        await book.save();

        res.send({ message: "Book borrowed successfully.", historyRecord });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error borrowing book." });
    }
};



exports.returnBook = async (req, res) => {
    const historyId = req.params.historyId;
    try {
        const historyRecord = await History.findById(historyId);
        const maxReturn = 1; // Maximum number of books a member can return
        const penaltyDuration = 3; // Penalty duration in days
        const penaltyFee = 0; // Penalty fee (if applicable)

        if (!historyRecord) {
            return res.status(404).send({ message: "History record not found." });
        }

        const book = await Book.findOne({ code: historyRecord.code });
        if (!book) {
            return res.status(404).send({ message: "Book not found." });
        }

        const dueDate = moment(historyRecord.dueDate);
        const lateDays = moment().diff(dueDate, 'days');

        if (lateDays > 0) {
            const penalty = lateDays * penaltyFee;
            historyRecord.penalty = penalty;
            await historyRecord.save();

            // Check if member has penalty
            if (penalty > 0) {
                const penaltyEndDate = moment().add(penaltyDuration, 'days');
                historyRecord.penaltyEndDate = penaltyEndDate;
                await historyRecord.save();
            }
        }

        // Check if the book is returned by another member
        const otherHistoryRecords = await History.find({ code: book.code, _id: { $ne: historyId } });
        if (otherHistoryRecords.length > 0) {
            return res.status(400).send({ message: "Book is returned by another member." });
        }

        historyRecord.returnDate = new Date();
        // Update the stock of the book
        book.stock = Math.max(1, book.stock - historyRecord.pinjamnya);
        await book.save();

        res.send({ message: "Book returned successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message || "Error returning book." });
    }
}

exports.findAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();

        const borrowedBooks = {};

        const borrowHistory = await History.find();

        borrowHistory.forEach(history => {
            if (!borrowedBooks[history.code]) {
                borrowedBooks[history.code] = history.pinjamnya;
            } else {
                borrowedBooks[history.code] += history.pinjamnya;
            }
        });

        const availableBooks = [];

        allBooks.forEach(book => {
            const availableQuantity = book.stock - (borrowedBooks[book.code] || 0);
            availableBooks.push({
                title: book.title,
                author: book.author,
                availableQuantity: availableQuantity
            });
        });

        res.send(availableBooks);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    }
};

exports.findAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.send(members);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving members."
        });
    }
};