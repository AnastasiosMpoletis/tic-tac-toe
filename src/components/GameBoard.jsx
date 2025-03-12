import { useState } from 'react';

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
export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    /**
     * Updates GameBoard state when a square is selected. Creates a copy of the previous state, updates it and returns it.
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((previousGameBoard) => {
            //object.assign() is used to create a shallow copy of the previousGameBoard
            //slice() is used to create a shallow copy of the previousGameBoard
            const updatedBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        });
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => { handleSelectSquare(rowIndex, colIndex) }}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}