const db = require('../models');
const Book = db.Book;

exports.create = (req, res) => {
    Book.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
}

exports.findAll = (req, res) => {
    Book.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
}

exports.findOne = (req, res) => {

    const id = req.params.id;
    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with id=" + id });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;
    Book.findByIdAndUpdate
        (id
            , req.body
            , { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        }
        )
}

exports.remove = (req, res) => {
    const id = req.params.id;
    Book.findOneAndDelete({ _id: id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
                });
            }
            res.send({
                message: "Member was deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Member with id=" + id
            });
            return err
        });
};