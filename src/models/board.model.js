const mongoose = require("mongoose");

//Here I'm creating a mongoose schema and exporting it below
const BoardSchema = new mongoose.Schema({
    playerOne: String,
    playerTwo: String,
    winner: String,
    board: Array,
    created_at: { type: Date, default: Date.now },
    deleted: { type: Boolean }
});

const Board = mongoose.model("Board", BoardSchema);

Board.count({}, function (err, count) {
    if(err) {
        throw err;
    }
    if (count > 0) return;

    const seedBoards = require("./board.seed.json");
    Board.create(seedBoards, function (err, newShirts) {
        if (err) {
            throw err;
        }
        console.log("DB seeded")
    });
});

module.exports = Board;