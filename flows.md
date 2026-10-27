1. Human player clicks on one square of the board
2. Human player chosen mark is printed on the square
3. Turn Switches
4. Computer player picks a random square that's available
5. Computer player mark is printed on the square
6. Turn Switches

---

1. A player clicks on one square of the board
2. The player current board configuration matches a winning condition
3. SET currentPlayer as the winner of the game
4. Stop the game

---

1. A player clicks on one square of the board
2. After that, The current board configuration doesn't have available squares
   any more and the currentPlayer is not a winner
3. SET the game to be draw
4. Stop the game

---

1. Play again button is clicked
2. Restart Game State [ board, winner, draw, ..etc ]
3. SET Player One mark to Player Two mark in the last game
4. SET Player Two mark to Player One mark in the last game
5. SET currentPlayer to the Player with the mark X
