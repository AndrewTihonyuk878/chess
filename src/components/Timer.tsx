import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../modules/Colors';
import { Player } from '../modules/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }
    
    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handlePause = () => {
        if (timer.current) {
            clearInterval(timer.current)
        } 
    }

    const handleContinue = () => {
        startTimer()
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return (
        <div className='timer'>
            <div className='timer__btn-block'>
                <button onClick={handleRestart} className='timer__btn'>Restart</button>
                <button onClick={handlePause} className='timer__btn'>Pause</button>
                <button onClick={handleContinue} className='timer__btn'>Continue</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;