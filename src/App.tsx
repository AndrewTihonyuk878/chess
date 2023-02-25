import { useState, useEffect } from 'react';
import './App.scss';
import BoardComponents from './components/BoardComponents';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './modules/Board';
import { Colors } from './modules/Colors';
import { Player } from './modules/Player';

function App() {

  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}/>
      <BoardComponents
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        board={board}
        setBoard={setBoard}
        />
        <div>
          <LostFigures 
            title='Black figures'
            figures={board.lostBlackFifures}
          />
          <LostFigures 
            title='White figures'
            figures={board.lostWhiteFifures}
          />
        </div>
    </div>
  );
}

export default App;


