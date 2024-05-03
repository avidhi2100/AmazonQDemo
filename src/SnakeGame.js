import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const Snake = ({ segments }) => {
    return (
        <div>
            {segments.map((segment, index) => (
                <div
                    key={index}
                    className="snake"
                    style={{
                        left: `${segment.x * 20}px`,
                        top: `${segment.y * 20}px`,
                    }}
                />
            ))}
        </div>
    );
};

const Food = ({ x, y }) => {
    return (
        <div
            className="food"
            style={{
                left: `${x * 20}px`,
                top: `${y * 20}px`,
            }}
        />
    );
};

const PowerUp = ({ x, y }) => {
    return (
        <div
            className="power-up"
            style={{
                left: `${x * 20}px`,
                top: `${y * 20}px`,
            }}
        />
    );
};

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) });
    const [powerUp, setPowerUp] = useState(null);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(100);
    const [isInvincible, setIsInvincible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y,
                };

                // Check for collision with the walls
                if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 30) {
                    if (!isInvincible) {
                        alert(`Game Over! Your score is ${score}`);
                        setScore(0);
                        setSpeed(100);
                        return [{ x: 10, y: 10 }];
                    }
                }

                // Check for collision with the snake's body
                if (!isInvincible && prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                    alert(`Game Over! Your score is ${score}`);
                    setScore(0);
                    setSpeed(100);
                    return [{ x: 10, y: 10 }];
                }

                // Eat the food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) });
                    setScore(score + 1);
                    if (score % 5 === 0) {
                        setSpeed(Math.max(50, speed - 10));
                    }
                    if (score % 10 === 0) {
                        setPowerUp({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) });
                    }
                    return [newHead, ...prevSnake];
                }

                // Collect the power-up
                if (powerUp && newHead.x === powerUp.x && newHead.y === powerUp.y) {
                    setPowerUp(null);
                    setIsInvincible(true);
                    setTimeout(() => {
                        setIsInvincible(false);
                    }, 10000);
                }

                return [newHead, ...prevSnake.slice(0, -1)];
            });
        }, speed);

        return () => clearInterval(interval);
    }, [direction, food, powerUp, score, speed, isInvincible]);

    return (
        <div className="snake-game">
            <div className="scoreboard">Score: {score}</div>
            <div className="game-board">
                <Snake segments={snake} />
                <Food x={food.x} y={food.y} />
                {powerUp && <PowerUp x={powerUp.x} y={powerUp.y} />}
            </div>
        </div>
    );
};

export default SnakeGame;
