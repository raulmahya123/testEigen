const db = require("../models");
const Member = db.Member;

exports.Create = (req, res) => {
   Member.create(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Member."
        });
    });
}

exports.FindAll = (req, res) => {
  Member.find({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving members."
        });
    });
}

exports.FindOne = (req, res) => {
    const id = req.params.id;
    Member.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Member with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res
            .status(500)
            .send({ message:err.message || "Error retrieving Member with id=" + id });
    });
}

exports.Update = (req, res) => {
    const id = req.params.id;
    Member.findByIdAndUpdate(id
        , req.body
        , { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Member with id=${id}. Maybe Member was not found!`
            });
        } else res.send({ message: "Member was updated successfully." });
    }
    )


}

exports.remove = (req, res) => {
    const id = req.params.id;
    Member.findOneAndDelete({ _id: id })
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
