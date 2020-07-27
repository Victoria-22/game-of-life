import React, { useCallback, useRef, useState } from 'react';
import produce from "immer";
import About from "./components/about";


function App() {

    const gridRows = 50;
    const gridColumns = 50;

    const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < gridRows; i++) {
            rows.push(Array.from(Array(gridColumns), () => 0));
        }
        return rows;
    };

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        const operations = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, -1],
            [-1, 1],
            [1, 1],
            [-1, -1]
        ];

        setGrid((currentGrid) => {
            return produce(currentGrid, gridCopy => {
                for (let i = 0; i < gridRows; i++) {
                    for (let j = 0; j < gridColumns; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < gridRows && newJ >= 0 && newJ < gridColumns) {
                                neighbors += currentGrid[newI][newJ];
                            }
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (currentGrid[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            })
        });

        setTimeout(runSimulation, 500);

    }, []);

    return (
        <>
            <div>
                <About/>
            </div>
            <button
                type='button'
                className='btn btn-primary buttons'
                onClick={() => {
                    setRunning(true);
                    runningRef.current = true;
                    runSimulation();
                }
                }
            >
                START
            </button>
            <button
                type='button'
                className='btn btn-danger buttons'
                onClick={() => {
                    setRunning(false);
                    runningRef.current = false;
                }
                }
            >
                STOP
            </button>
            <button
                type='button'
                className='btn btn-secondary buttons'
                onClick={() => {
                    setGrid(generateEmptyGrid());
                }}
            >
                CLEAR
            </button>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridColumns}, 20px`,
                    marginLeft: 40,
                    marginTop: 25,
                    marginBottom: 25,
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => {
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: grid[i][j] ? 'darkblue' : undefined,
                                border: 'solid 1px black'
                            }}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default App;
