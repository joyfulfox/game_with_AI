import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { validWin } from './validWin';
import { setNewWinner } from './../../API/';

export const Play = () => {
    const [winner, setWinner] = useState(null);
    const [showResult, setResult] = useState(false);
    const [delay, setDelay] = useState(0);
    const [name, setName] = useState('');
    const [field, setField] = useState(0);
    const [date, setDate] = useState(null);
    const settings = useSelector((state) => state);

    let validInterval = true;

    useEffect(() => {
        if(winner !== null && date !== null){
            const data = {winner : `${winner.length > 0 ? winner : 'User'}`, date : `${date}`};
            console.log(data);
            setNewWinner(data);
        }
        setDelay(settings.selectedMode.delay);
        setField(settings.selectedMode.field);
    }, [settings, winner, date]);

    const handleName = ({ target: { value } }) => {
        setName(value);
    }

    const nameRef = useRef(null);

    const validWinner = (count, field, playerName, interval) => { //validation is anybody won
        if (validWin(count, field, playerName) !== undefined) {
            clearTimeout(interval);
            validInterval = true;
            setWinner(playerName.length > 0 ? playerName : 'User');
            setResult(true);
            document.querySelector('#play_btn').innerText = 'Play again';
            document.querySelector('#mode').removeAttribute('disabled');
            document.querySelectorAll('td').forEach(e => e.style.background = 'transparent');
            document.querySelectorAll('td').forEach(e => e.setAttribute('data_checked', false));
            nameRef.current.removeAttribute('disabled');            //makes editable input field
            const today = new Date();
            var newDate = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;
            setDate(newDate);
        }
    }

    const startGame = () => {                                         //works after click play
        if (validInterval) {
            let aiCount = 0;
            let playerCount = 0;
            document.querySelector('#mode').setAttribute('disabled', true);
            nameRef.current.setAttribute('disabled', true);                 //makes disable input field

            validInterval = false;
            const interval = setInterval(() => {                            //set interval to color rectangles in blue (contain logic on click and "AI")
                let id;
                do {                                                        //search random id that wasn't use before
                    const firstNumber = Math.floor(Math.random() * field);
                    const secondNumber = Math.floor(Math.random() * field);
                    const number = `id${firstNumber}_${secondNumber}`;
                    id = number;
                } while (document.getElementById(id).getAttribute('data_checked') === 'true');

                function pressRect(e) {                                     //function that works on click
                    const el = e.target;
                    el.style.background = 'green';
                    el.setAttribute('data_checked', 'true');
                    playerCount++;
                    element.style.cursor = 'auto';
                    validWinner(playerCount, field, name, interval);
                }

                const element = document.getElementById(id);
                element.setAttribute('data_active', true);
                element.style.background = 'blue';
                element.style.cursor = 'pointer';
                element.addEventListener('click', pressRect, false);
                setTimeout(() => {                                          //setTimeout plays AI's role
                    if (element.getAttribute('data_checked') === 'false' && !validInterval) {
                        element.style.background = 'red';
                        element.setAttribute('data_checked', true);
                        element.style.cursor = 'auto';
                        aiCount++;
                        validWinner(aiCount, field, 'Computer', interval);
                    }
                    element.removeEventListener('click', pressRect, false);       //removes listener to make unclickable rectangle
                }, delay);
            }, delay)
        }
    }

    return (
        <>
            <input className='player_name' type='text' ref={nameRef} onChange={handleName} placeholder='Enter your name' />
            <button onClick={startGame} className='play' id='play_btn' >Play</button>
            {
                showResult ? (
                    <p className='winner_name'>{winner} won!</p>
                ) : (<></>)
            }
        </>
    )
}