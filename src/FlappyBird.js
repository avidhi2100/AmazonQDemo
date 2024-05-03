import React, { useState, useEffect } from 'react';
import './FlappyBird.css';

const FlappyBird = () => {
    const [bird, setBird] = useState({ x: 50, y: 300 });
    const [pipes, setPipes] = useState([
        { x: 800, y: 0, height: 200 },
        { x: 1200, y: 400, height: 200 },
    ]);
    const [score, setScore] = useState(0);
    const [gravity, setGravity] = useState(0.5);
    const [velocity, setVelocity] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ' ') {
                setVelocity(-10);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update bird position
            setBird((prevBird) => ({
                x: prevBird.x,
                y: prevBird.y + velocity,
            }));

            // Update pipe positions
            setPipes((prevPipes) =>
                prevPipes.map((pipe) => ({
                    x: pipe.x - 5,
                    y: pipe.y,
                    height: pipe.height,
                }))
            );

            // Check for collisions
            if (
                bird.y <= 0 ||
                bird.y >= 600 ||
                pipes.some(
                    (pipe) =>
                        bird.x >= pipe.x &&
                        bird.x <= pipe.x + 100 &&
                        (bird.y <= pipe.y || bird.y >= pipe.y + pipe.height)
                )
            ) {
                setIsGameOver(true);
                alert(`Game Over! Your score is ${score}`);
                setScore(0);
                setBird({ x: 50, y: 300 });
                setPipes([
                    { x: 800, y: 0, height: 200 },
                    { x: 1200, y: 400, height: 200 },
                ]);
                setVelocity(0);
            }

            // Update score
            if (pipes[0].x <= 50) {
                setScore(score + 1);
                setPipes((prevPipes) => [
                    ...prevPipes.slice(1),
                    { x: 1200, y: Math.floor(Math.random() * 400), height: 200 },
                ]);
            }

            // Apply gravity
            setVelocity((prevVelocity) => prevVelocity + gravity);
        }, 16);

        return () => clearInterval(interval);
    }, [bird, pipes, score, gravity, velocity, isGameOver]);

    return (
        <div className="flappybird-game">
            <div className="scoreboard">Score: {score}</div>
            <div className="game-board">
                <div
                    className="bird"
                    style={{
                        left: `${bird.x}px`,
                        top: `${bird.y}px`,
                    }}
                />
                {pipes.map((pipe, index) => (
                    <div
                        key={index}
                        className="pipe"
                        style={{
                            left: `${pipe.x}px`,
                            top: `${pipe.y}px`,
                            height: `${pipe.height}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlappyBird;
