import React, { useState, useEffect } from 'react';
import { getWinners } from '../API';

export const WinnerList = () => {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const winnersData = await getWinners();
        setWinners(winnersData);
    }

    return (
        <div className='leader_board_wrapper'>
            <div className='leader_board'>
                <p className='leader_board_header'>Leader Board</p>
                {winners.slice(0, 8).map(e => {
                    return (
                        <div key={e.id} className='leader_board_winner'>
                            <p>{e.winner}</p>
                            <p>{e.date}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}