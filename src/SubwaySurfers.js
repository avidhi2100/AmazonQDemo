import React, { useState, useEffect } from 'react';
import './SubwaySurfers.css';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

class Maze {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
        this.startPos = null;
        this.endPos = null;
    }

    createGrid() {
        const grid = [];
        for (let i = 0; i < this.rows; i++) {
            grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                grid[i][j] = 0; // 0 represents a walkable path, 1 represents a wall
            }
        }
        return grid;
    }

    setStartPosition(row, col) {
        this.startPos = { row, col };
    }

    setEndPosition(row, col) {
        this.endPos = { row, col };
    }

    setWall(row, col) {
        this.grid[row][col] = 1;
    }

    isWalkable(row, col) {
        return this.grid[row][col] === 0;
    }

    isOutOfBounds(row, col) {
        return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
    }

    solve() {
        const path = [];
        if (this.dfs(this.startPos.row, this.startPos.col, path)) {
            return path;
        }
        return [];
    }


    dfs(row, col, path) {
        if (this.isOutOfBounds(row, col) || !this.isWalkable(row, col)) {
            return false;
        }

        if (row === this.endPos.row && col === this.endPos.col) {
            return true;
        }

        this.grid[row][col] = 2; // Mark the current cell as visited
        path.push({ row, col });

        if (
            this.dfs(row - 1, col, path) ||
            this.dfs(row + 1, col, path) ||
            this.dfs(row, col - 1, path) ||
            this.dfs(row, col + 1, path)
        ) {
            return true;
        }

        this.grid[row][col] = 0; // Unmark the current cell
        path.pop();
        return false;
    }
}
const MazeGame = () => {
    const [maze, setMaze] = useState(null);
    const [path, setPath] = useState([]);

    useEffect(() => {
        const newMaze = new Maze(10, 10);
        newMaze.setStartPosition(0, 0);
        newMaze.setEndPosition(9, 9);
        newMaze.setWall(1, 1);
        newMaze.setWall(1, 2);
        newMaze.setWall(2, 2);
        newMaze.setWall(3, 3);
        newMaze.setWall(4, 6);
        newMaze.setWall(5, 3);
        newMaze.setWall(6, 1);
        newMaze.setWall(7, 2);
        newMaze.setWall(8, 5);
        newMaze.setWall(9, 2);
        setMaze(newMaze);
    }, []);

    const handleSolve = () => {
        const newPath = maze.solve();
        setPath(newPath);
    };

    return (
        <GameContainer>
            <Title>Maze Game</Title>
            <MazeContainer>
                {maze?.grid.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                isStart={maze.startPos.row === rowIndex && maze.startPos.col === colIndex}
                                isEnd={maze.endPos.row === rowIndex && maze.endPos.col === colIndex}
                                isWall={cell === 1}
                                isPath={path.some((pos) => pos.row === rowIndex && pos.col === colIndex)}
                            >
                                {cell === 1 ? (
                                    <WallAnimation />
                                ) : path.some((pos) => pos.row === rowIndex && pos.col === colIndex) ? (
                                    <PathAnimation />
                                ) : null}
                            </Cell>
                        ))}
                    </Row>
                ))}
            </MazeContainer>
            <Button onClick={handleSolve}>Solve</Button>
        </GameContainer>
    );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #333;
`;

const MazeContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  background-color: ${(props) =>
    props.isStart
        ? '#4caf50'
        : props.isEnd
            ? '#e91e63'
            : props.isWall
                ? '#333'
                : props.isPath
                    ? '#2196f3'
                    : '#f0f0f0'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const WallAnimation = () => {
    const props = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        loop: { reverse: true },
        config: { duration: 1000 },
    });

    return <animated.div style={props}>🧱</animated.div>;
};

const PathAnimation = () => {
    const props = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
    });

    return <animated.div style={props}>🟢</animated.div>;
};

export default MazeGame;
