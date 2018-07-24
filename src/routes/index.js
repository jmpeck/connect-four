const router = require('express').Router();
//Import all models
let board = require("../models/board.model")

module.exports = router;

router.get('/board', function (req, res, next) {
    board.find({deleted: {$ne: true}}, function(err, boards) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    
      res.json(boards);
    });
  });
  
router.post('/board', function(req, res, next) {
    const moveData = {
        playerOne: req.body.playerOne,
        playerTwo: req.body.playerTwo,
        winner: req.body.winner,
        board: req.body.board,
        // created_at: req.body.created_at,
        // deleted: req.body.deleted
    };

    board.create(moveData, function(err, newBoard) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(newBoard);
    });
});

router.put('/board/:moveId', function(req, res, next) {
    const moveId = req.params.moveId;
       
    board.findById(moveId, function(err, board) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      if (!board) {
        return res.status(404).json({message: "move not found"});
      }
  
    board.playerOne = req.body.playerOne;
    board.playerTwo = req.body.playerTwo;
    board.winner = req.body.winner;
  
    board.save(function(err, savedmove) {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        res.json(savedmove);
      })
  
    })
  });
    
router.delete('/board/:moveId', function(req, res, next) {
    const moveId = req.params.moveId

    board.findById(moveId, function (err, move) {
      if (err) {
        console.log(err)
        return res.status(500).json(err)
      }
      if (!move) {
        return res.status(404).json({message: 'Move not found'})
      }
  
      move.deleted = true
  
      move.save(function (err, doomedMove) {
        res.json(doomedMove)
      })
    })
  });

router.get('/board/:moveId', function(req, res, next) {
    const {moveId} = req.params;
    // same as 'const moveId = req.params.moveId'
  
    const board = boards.find(entry => entry.id === moveId);
    if (!board) {
      return res.status(404).end(`Could not find board '${moveId}'`);
    }
  
    res.json(board);
  });