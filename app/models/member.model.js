module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            code: String,
            name: String,
        }
    );

    const Member = mongoose.model("member", schema);
    return Member;

};
