import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [score, setScore] = useState(0);

    const handleCellClick = (index) => {
        if (board[index] === null) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

            // Check for a winner
            if (checkWinner(newBoard, currentPlayer)) {
                alert(`Player ${currentPlayer} wins!`);
                setScore(score + 1);
                resetBoard();
            } else if (checkDraw(newBoard)) {
                alert("It's a draw!");
                resetBoard();
            }
        }
    };

    const checkWinner = (board, player) => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombos.some((combo) => {
            return combo.every((index) => board[index] === player);
        });
    };

    const checkDraw = (board) => {
        return board.every((cell) => cell !== null);
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
    };

    return (
        <div className="tictactoe-game">
            <div className="scoreboard">Score: {score}</div>
            <div className="game-board">
                {board.map((cell, index) => (
                    <div key={index} className="cell" onClick={() => handleCellClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicTacToe;
