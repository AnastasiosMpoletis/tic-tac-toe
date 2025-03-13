import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

// GameBoard instance
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
  // Lifting the state up. The state is managed by the parent component App to Player, GameBoard and Log components.
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  // We want to shallow copy initialGameBoard to reset gameBoard and restart the game.
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn; // Deconstruct turn
    const { row, col } = square; // Deconstruct square

    gameBoard[row][col] = player; // Update board cell
  }

  let winner;

  // Check if a player has won the game
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      //Set winner
      winner = firstSquareSymbol;
    }
  }

  // Check if there is a draw. All turns have passed and no winner is set.
  const hasDraw = gameTurns.length === 9 && !winner;

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

  /**
   * Restarts the game by setting the gameTurns to an empty array. The rest are reset by the useState hooks and React.
   */
  function handleRestart() {
    setGameTurns([]);
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

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}

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
