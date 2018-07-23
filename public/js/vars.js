
//fix the html with the edit button
function listItemTemplate(data) {
    var labels = `
    <thead>
        <tr>
            <th>Red</th>
            <th>Black</th>
            <th>Winner</th>
        </tr>
    </thead>
    `;
    var compiled = '';
    data.forEach(item => {
    compiled += `
    <tr class="list-group-item">
      <td>${item.playerOne}</td>
      <td>${item.playerTwo}</td>
      <td>${item.winner}</td>
        <td>
            <span class="pull-right">
                <button type="button" class="btn btn-xs btn-default" onclick="handleEditMove(this)" data-move-id="${item._id}">Edit</button>
                <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteMove(this)" data-move-id="${item._id}">Del</button>
            </span>
        </td>
    </tr>
`;
});
compiled = `<tbody class="list-group">${compiled}</tbody>`;
full_table = labels + compiled;
return full_table;
}

function getMoves() {
    //testing out my add -- returns the state of the board!!!
    //return board;
    return $.ajax('/api/board')
      .then(res => {
        console.log("Results from getMoves()", res);
        return res;
      })
      .fail(err => {
        console.log("Error in getMoves()", err);
        throw err;
      });
  }

  function refreshMoveList() {
    getMoves()
      .then(moves => {
        window.movelist = moves;        
        $('#data-container').html(listItemTemplate(moves));
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

// Begin to count moves.
var move_count = 0;

// Keep track of current color.

