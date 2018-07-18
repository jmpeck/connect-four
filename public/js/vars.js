//john's bs
function listItemTemplate(data) {
    var compiled = '';
    data.forEach(item => {
    compiled += `
    <li class="list-group-item">
      <strong>${item.name}</strong> - ${item.description}
    </li>
    `;
  });
  return compiled;
}

function getShirts() {
    //testing out my add -- returns the state of the board!!!
    //return board;
    return $.ajax('/api/shirt')
      .then(res => {
        console.log("Results from getShirts()", res);
        return res;
      })
      .fail(err => {
        console.log("Error in getShirts()", err);
        throw err;
      });
  }

  function refreshShirtList() {
    getShirts()
      .then(shirts => {
        const data = {shirts: shirts};
        $('#list-container').html(listItemTemplate(data.shirts));
      })
  }

// Create variables for use in our game.

// Config object.
// @todo: Store row & column count in config and have the game adjust
//        automatically. Keep the board below in a comment for reference. See
//        http://stackoverflow.com/a/2716973/1154642 for how to build the table
//        automatically with loops. Maybe expose the option to users... but
//        probably not, to keep the UI simple.
// @todo: Eliminate global variables and methods by making them all part of a
//        private anonymous function. For Reference: Anonymous Functions And The
//        Module Pattern (http://www.smashingmagazine.com/2010/04/20/seven-javascript-things-i-wish-i-knew-much-earlier-in-my-career/).
// @todo: Extra credit. Make this more accessible (keyboard navigation + screen-
//        reader friendly).
var config = {
        blackPlayerName: "Player 1",
        redPlayerName: "Player 2",
        startingPlayer: "black", // Choose 'black' or 'red'.
        takenMsg: "This position is already taken. Please make another choice.",
        drawMsg: "This game is a draw.",
        playerPrefix: "Current Player is: ",
        winPrefix: "The winner is: ",
        countToWin: 4,
    };

// Define the empty board as a two-dimensional array, full of zeros. In our
// game, 0 represents empty, 'red' represents a red disc, and 'black' represents
// a black disc.
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

// Set the starting player.
var currentPlayer = config.startingPlayer;
