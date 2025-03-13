import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

// Initial Players instance
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

// GameBoard instance
const INITIAL_GAME_BOARD = [
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

/**
 * @param {*} gameTurns 
 * @returns GameBoard by updating the board state
 */
function deriveGameBoard(gameTurns) {
  /**
   * We want to deep copy initialGameBoard to reset gameBoard and restart the game. 
   * {@link" https://academind.com/tutorials/reference-vs-primitive-values}
   * object.assign(): {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}
   * slice(): {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}
   */
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn; // Deconstruct turn
    const { row, col } = square; // Deconstruct square

    gameBoard[row][col] = player; // Update board cell
  }

  return gameBoard;
}

/**
 * @param {*} gameBoard 
 * @param {*} players 
 * @returns Winner by checking the winning combinations
 */
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      //Set winner's name
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  // Lifting the state up. The state is managed by the parent component App to Player, GameBoard and Log components.
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  // Check if there is a draw. All turns have passed and no winner is set.
  const hasDraw = gameTurns.length === 9 && !winner;

  /**
   * Updates GameBoard state, Log when a square is selected. 
   * @param {*} rowIndex 
   * @param {*} colIndex 
   */
  function handleSelectSquare(rowIndex, colIndex) {
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

  /**
   * Updates Players name by symbol in Player component.
   * @param {*} symbol 
   * @param {*} newName 
   */
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((previousPlayers) => {
      return {
        ...previousPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
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
