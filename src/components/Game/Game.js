import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMode } from '../../actions/settingsActions';
import { GameField } from './GameField';
import { Play } from './Play';
import { WinnerList } from './../WinnerList';
import { fetchSettings } from './../../API/';

export const Game = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    const handleSelectMode = ({ target: { value } }) => {
        dispatch(selectMode(value));
    };

    const modeNames = Object.keys(settings.data).map((key) => key);

    return (
        <>
            {settings.loading ? (
                <div>Loading...</div>
            ) : (
                    <>
                        <div className="game_wrapper">
                            <div className="game_tools">
                                <select onChange={handleSelectMode} id="mode">
                                    {modeNames.map((e, i) => (
                                        <option key={i} value={e}>
                                            {e}
                                        </option>
                                    ))}
                                </select>
                                <Play />
                            </div>
                            <div className="field_wrapper">
                                <GameField />
                            </div>
                        </div>
                        <WinnerList />
                    </>
                )}
        </>

    );
};
