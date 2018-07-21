const mongoose = require("mongoose");

// const ShirtSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     price: Number,
//     created_at: { type: Date, default: Date.now }
//     }
// );

// const Shirt = mongoose.model("Shirt", ShirtSchema);

// Shirt.count({}, function (err, count) {
//     if (err) {
//         throw err;
//     }
//     if (count > 0) return;

//     const seedShirts = require("./shirt.seed.json");
//     Shirt.create(seedShirts, function (err, newShirts) {
//         if (err) {
//             throw err;
//         }
//         console.log("DB seeded")
//     });
// });

// module.exports = Shirt;


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