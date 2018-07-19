const router = require('express').Router();
//Import all models
let shirt = require("../models/shirt.model.js")

module.exports = router;

const SHIRTS = [
    {id: 'a', name: 'Cat tree', description: 'A cute cat shirt', price: 20.0},
    {id: 'b', name: 'iron man', description: 'tony stark in a suit', price: 10.0},
    {id: 'c', name: 'snow man', description: 'A cool shirt', price: 12.50},
    {id: 'd', name: 'coffee', description: 'A pick me up', price: 15.0}
  ];

  router.get('/shirt', function (req, res, next) {
    shirt.find({}, function(err, shirts) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    
      res.json(shirts);
    });
  });
  
router.post('/shirt', function(req, res, next) {
    const shirtData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };

    shirt.create(shirtData, function(err, newShirt) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(newShirt);
    });
});

router.put('/shirt/:shirtId', function(req, res, next) {
    const {shirtId} = req.params;
    const shirt = SHIRTS.find(entry => entry.id === shirtId);
    if (!shirt) {
      return res.status(404).end(`Could not find shirt '${shirtId}'`);
    }
  
    shirt.name = req.body.name;
    shirt.description = req.body.description;
    res.json(shirt);
  });
    
router.delete('/shirt/:shirtId', function(req, res, next) {
res.end(`Deleting a shirt '${req.params.shirtId}'`);
});

router.get('/shirt/:shirtId', function(req, res, next) {
    const {shirtId} = req.params;
    // same as 'const shirtId = req.params.shirtId'
  
    const shirt = SHIRTS.find(entry => entry.id === shirtId);
    if (!shirt) {
      return res.status(404).end(`Could not find shirt '${shirtId}'`);
    }
  
    res.json(shirt);
  });