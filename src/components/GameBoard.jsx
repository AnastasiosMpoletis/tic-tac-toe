/**
 * GameBoard instance
 */
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

/**
 * @returns GameBoard component
 */
export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard; //derived state
    for (const turn of turns) {
        const { square, player } = turn; //deconstruct turn
        const { row, col } = square; //deconstruct square

        gameBoard[row][col] = player; //update board cell
    }

    // /**
    //  * Updates GameBoard state when a square is selected. Creates a copy of the previous state, updates it and returns it.
    //  * 
    //  * @param {*} rowIndex 
    //  * @param {*} colIndex 
    //  */
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((previousGameBoard) => {
    //         //object.assign() is used to create a shallow copy of the previousGameBoard
    //         //slice() is used to create a shallow copy of the previousGameBoard
    //         const updatedBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}