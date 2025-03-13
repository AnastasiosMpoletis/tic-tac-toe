/**
 * @returns Log component
 */
export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map(turn =>
                // Literal syntax to create a unique key
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row}, {turn.square.col}
                </li>
            )}
        </ol>
    );
}