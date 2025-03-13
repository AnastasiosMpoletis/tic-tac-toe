/**
 * @param {*} param0 
 * @returns GameOver component 
 */
export default function GameOver({ winner, onRestart }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}
            <p>
                {/* TODO ANBOL implement Rematch button */}
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    );
}