import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

function App() {
  //Lifting the state up. The state is managed by the parent component App to Player, GameBoard and Log components.
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

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

    // Creates a copy of the previous state, updates it and returns it.
    setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");
    
    setGameTurns((previousGameTurns) => {
      const isCurrentPlayerX = previousGameTurns.length > 0 && previousGameTurns[0].player === "X";
      let currentPlayer = isCurrentPlayerX ? "O" : "X";

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
          turns={gameTurns}
        />

        <Log />
      </div>
    </main>
  )
}

export default App
