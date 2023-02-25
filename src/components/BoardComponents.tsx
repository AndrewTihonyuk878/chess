import React, { FC, useEffect, useState } from 'react'
import { Board } from '../modules/Board';
import { Cell } from '../modules/Cell';
import { Player } from '../modules/Player';
import CellComponents from './CellComponents';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}


const BoardComponents: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function onClickCell(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }        
    }

    useEffect(() => {
        hightlightCells()
    }, [selectedCell])

    function hightlightCells() {
        board.hightlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>Curruent player - {currentPlayer?.color}</h3><br />
            <div className='board'>
            {board.cells.map((row, index) => 
            <React.Fragment key={index}>
                {row.map(cell => 
                    <CellComponents
                        onClickCell={onClickCell}
                        cell={cell}
                        key={cell.id}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                )}
            </React.Fragment>
        )}
    </div>
        </div>
    )
}

export default BoardComponents;
