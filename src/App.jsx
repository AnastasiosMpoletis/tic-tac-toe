import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

/**
 * GameBoard instance
 */
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

/**
 * @param {*} gameTurns 
 * @returns Active player by previous board state
 */
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  //Lifting the state up. The state is managed by the parent component App to Player, GameBoard and Log components.
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn; //deconstruct turn
    const { row, col } = square; //deconstruct square

    gameBoard[row][col] = player; //update board cell
  }

  for (const combination of WINNING_COMBINATIONS) {
    //TODO ANBOL Implement the logic to check if a player has won the game
    // const firstSymbol;
    // const secondSymbol;
    // const thirdSymbol;
  }

  /**
   * Updates GameBoard state, Log when a square is selected. 
   * @param {*} rowIndex 
   * @param {*} colIndex 
   */
  function handleSelectSquare(rowIndex, colIndex) {
    /**
     * object.assign() is used to create a shallow copy of the previousGameBoard
     * slice() is used to create a shallow copy of the previousGameBoard
     */
    setGameTurns((previousGameTurns) => {
      const currentPlayer = deriveActivePlayer(previousGameTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        }, ...previousGameTurns
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
