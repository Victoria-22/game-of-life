import React from "react";

const About = () => {
    return (
        <div className="game-description">
            <h1>Game of Life</h1>
            <h3>Rules of the game:</h3>
            <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of
                which is in one of two possible states, live or dead, (or populated and unpopulated, respectively).
                Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically,
                or diagonally adjacent. At each step in time, the following transitions occur</p>
            <ul>
                <li>
                    Any live cell with two or three live neighbours survives.
                </li>
                <li>
                    Any dead cell with three live neighbours becomes a live cell.
                </li>
                <li>
                    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
                </li>
            </ul>
        </div>
    );
};

export default About;