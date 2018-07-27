/**
 * A function for adding a disc to our Connect Four board.
 *
 * @param string color The color of the current player.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * //thinking of adding move number
 */

 /// just to test

 function submitMove() {
    console.log("it worked");

    const moveData = {
        playerOne: config.blackPlayerName,
        playerTwo: config.redPlayerName,
        winner: $("#player").text(),
        board: board,
        _id: $('#move-id').val()
     };
     
     console.log("Your move data", moveData);

    let method, url;
    if (moveData._id) {
        moveData.playerOne = $('#playerOne-name').val(); 
        moveData.playerTwo = $('#playerTwo-name').val();
        moveData.winner = $('#winner-name').val();
        moveData.board = $('#move-board').val();
        method = 'PUT';
        url = '/api/board/' + moveData._id;
    } else {
        method = 'POST';
        url = '/api/board';
    }

     fetch(url, {
        method: method,
        body: JSON.stringify(moveData),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(move => {
            console.log("we have posted the data", move);
            refreshMoveList();
        })
        .catch(err => {
            console.error("A terrible thing has happened", err);
        }) 
    
        cancelForm();
 }

 function deleteMove(moveId) {
    const url = '/api/board/' + moveId;

    fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => {
        console.log("DOOOOOOOM!!!!");
        refreshMoveList();
    })
    .catch(err => {
        console.error("I'm not dead yet!", err)
    })
    console.log("it worked");
 }

 function handleEditMove (element) {
    const moveId = element.getAttribute("data-move-id");
    console.log("I will edit for you", moveId);
    const move = window.movelist.find(move => move._id === moveId);
    if (move) {
     setForm(move);
    }
  
    showEditForm();
  }

  function setForm(data) {
    data = data || {};
  
    const move = {
      playerOne: data.playerOne || '',
      playerTwo: data.playerTwo || '',
      winner: data.winner || '',
      _id: data._id || '',
    };
  
    $('#playerOne-name').val(move.playerOne);
    $('#playerTwo-name').val(move.playerTwo);
    $('#winner-name').val(move.winner);
    $('#move-id').val(move._id);
  }

  function cancelForm () {
    setForm()
    hideForm()
  }

  function hideForm() {
      $("#edit-board-form").hide();
  }

function handleDeleteMove(element) {
    const moveId = element.getAttribute('data-move-id');
  
    if (confirm("Are you sure?")){
        deleteMove(moveId);
    }
  }

function showEditForm() {
    $('#edit-board-form').show();
}

function hideEditForm(){
    $('#edit-board-form').hide();
}


//  function cancelShirtForm() {
//     console.log("cancel worked");
//  }

function addDiscToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
    console.log("Disk added. Congratulations.");
    move_count += 1;

}

/**
 * Print the contents of our `board` variable to the html page.
 */
function printBoard() {
    // Loop through the board, and add classes to each cell for the
    // appropriate colors.
    
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] !== 0) {
                var cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').addClass(board[y][x]);
            }
        }
    }
    console.log("Move submitted. Congratulations.");
    
}

//this is what recreates the board state when user hits the review button
function recallBoard(element) {
    const moveId = element.getAttribute("data-move-id");
    console.log("Here is what it looked like", moveId);
    const move = window.movelist.find(move => move._id === moveId);

    console.log(move);
    var state = move.board;

    //I add classes to the buttons and remove them according to the saved board array
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            var cell = $("tr:eq(" + y + ")").find('td').eq(x);
            cell.children('button').removeClass();
            if (state[y][x] !== 0) {
                var cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').addClass(state[y][x]);
        }
    }
   
    $('.play-again').show("slow");
  }
}

/**
 * A function for changing players at the end of a turn.
 */
function changePlayer() {
    // Change the value of our player variable.
    if (currentPlayer === 'black') {
        currentPlayer = 'red';
    } else {
        currentPlayer = 'black';
    }

    // Update the UI.
    $('#player').removeClass().addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);
}

/**
 * If there are empty positions below the one chose, return the new y-position
 * we should drop the piece to.
 *
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this at the bottom?".
 */
function dropToBottom(x_pos, y_pos) {
    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. If one hasn't, return the empty position.
    for (var y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            return y;
        }
    }

    return y_pos;
}

/**
 * Test to ensure the chosen location isn't taken.
 *
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this spot taken?".
 */
function positionIsTaken(x_pos, y_pos) {
    var value = board[y_pos][x_pos];

    return value === 0 ? false : true;
}

/**
 * Determine if the game is a draw (all peices on the board are filled).
 *
 * @return bool Returns true or false for the question "Is this a draw?".
 */
function gameIsDraw() {
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }

    // No locations were empty. Return true to indicate that the game is a draw.
    return true;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 *
 * @return bool Returns true if a win was found, and otherwise false.
 */
function horizontalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    // Scan each row in series, tallying the length of each series. If a series
    // ever reaches four, return true for a win.
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each row, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }

    // No horizontal win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive vertical pieces.
 *
 * @return bool Returns true if a win was found, and otherwise false.
 */
function verticalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    // Scan each column in series, tallying the length of each series. If a
    // series ever reaches four, return true for a win.
    for (var x = 0; x <= 6; x++) {
        for (var y = 0; y <= 5; y++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each column, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }

    // No vertical win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive diagonel pieces.
 *
 * @todo: refactor this to make it more DRY.
 * @return bool Returns true if a win was found, and otherwise false.
 */
function diagonalWin() {
    var x = null,
        y = null,
        xtemp = null,
        ytemp = null,
        currentValue = null,
        previousValue = 0,
        tally = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
        xtemp = 0;
        ytemp = y;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
        xtemp = 6;
        ytemp = y;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // No diagonal wins found. Return false.
    return false;
}
