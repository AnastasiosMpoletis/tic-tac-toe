import Player from './components/Player.jsx';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>

        {/* TODO ANBOL Add Game board */}
        {/* TODO ANBOL Add Logs */}
      </div>
    </main>
  )
}

export default App
