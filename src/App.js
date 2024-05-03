import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';
import FlappyBird from './FlappyBird';
import './App.css';
import MazeGame from "./SubwaySurfers";

const App = () => {
    useEffect(() => {
        // Add a class to the app element to trigger the animations
        document.querySelector('.app').classList.add('app-loaded');
    }, []);

    return (
        <Router>
            <div className="app">
                <header className="header">
                    <nav className="navbar">
                        <ul>
                            <li>
                                <Link to="/">Game Selection</Link>
                            </li>
                            <li>
                                <Link to="/snake">Snake</Link>
                            </li>
                            <li>
                                <Link to="/tictactoe">Tic Tac Toe</Link>
                            </li>
                            <li>
                                <Link to="/flappybird">Flappy Bird</Link>
                            </li>
                            <li>
                                <Link to="/maze">Maze game</Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main className="main-content">
                    <Routes>
                        <Route path="/snake" element={<SnakeGame />} />
                        <Route path="/tictactoe" element={<TicTacToe />} />
                        <Route path="/flappybird" element={<FlappyBird />} />
                        <Route path="/maze" element={<MazeGame />} />
                        <Route path="/" element={<GameSelection />} />
                    </Routes>
                </main>

                <footer className="footer">
                    <p>&copy; 2023 Game Collection. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

const GameSelection = () => {
    return (
        <div className="game-selection">
            <h1 className="title">Select a Game</h1>
            <div className="game-cards">
                <div className="game-card">
                    <Link to="/snake">
                        <h2 className="game-title">Snake</h2>
                        <p className="game-description">Classic snake game</p>
                    </Link>
                </div>
                <div className="game-card">
                    <Link to="/tictactoe">
                        <h2 className="game-title">Tic Tac Toe</h2>
                        <p className="game-description">Tic Tac Toe game</p>
                    </Link>
                </div>
                <div className="game-card">
                    <Link to="/flappybird">
                        <h2 className="game-title">Flappy Bird</h2>
                        <p className="game-description">Flappy Bird game</p>
                    </Link>
                </div>
                <div className="game-card">
                    <Link to="/maze">
                        <h2 className="game-title">Maze</h2>
                        <p className="game-description">Maze game</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default App;
