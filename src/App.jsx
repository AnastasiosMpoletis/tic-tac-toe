import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard />

        {/* TODO ANBOL Add Logs */}
      </div>
    </main>
  )
}

export default App
