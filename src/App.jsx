import Player from './components/Player.jsx';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>

        {/* TODO ANBOL Add Game board */}
        {/* TODO ANBOL Add Logs */}
      </div>
    </main>
  )
}

export default App
