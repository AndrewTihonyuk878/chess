import { FC } from 'react';
import { Cell } from '../modules/Cell';

interface CellProps {
    onClickCell: (cell: Cell) => void;
    cell: Cell;
    selected: boolean;
}

const CellComponents: FC<CellProps> = ({cell, selected, onClickCell}) => {
    return (
        <div 
            className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
            onClick={() => onClickCell(cell)}
            style={{background: cell.available && cell.figure ? 'green' : ''}}>
            {cell.available && !cell.figure && <div className='available'/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    );
};

export default CellComponents;