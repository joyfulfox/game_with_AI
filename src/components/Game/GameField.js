import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTable } from './../../actions/settingsActions';

export const GameField = () => {
    const [field, setField] = useState(0);
    const [cells, setCells] = useState([]);

    const settings = useSelector((state) => state);
    const table = useSelector((state) => state.table);
    const dispatch = useDispatch();

    const memoizedCellArray = useMemo(
        () => {
            const colsArr = [];
            (() => {
                for (let i = 0; i < field; i++) {
                    const array = [...Array(field).keys()];
                    const x = array.reduce((ac, e, index) => ({ ...ac, [`id${i}_${index}`]: { id: `id${i}_${index}`, checked: false } }), {});
                    colsArr.push(x);
                }
            })();
            return colsArr;
        },
        [field]);

    useLayoutEffect(() => {
        setField(settings.selectedMode.field);
        setCells(memoizedCellArray);
    }, [settings, memoizedCellArray]);

    useEffect(() => {
        dispatch(setTable(cells));
    }, [dispatch, cells]);

    return (
        <table border='1' cellSpacing='0' >
            <tbody>
                {
                    table.map((e, i) => {
                        return (<tr key={i}>
                            {Object.keys(e).map((el, index) =>
                                <td
                                    key={el}
                                    id={el}
                                    data_checked={`${table[i][el].checked}`}
                                    data_active='false'
                                />
                            )}
                        </tr>)
                    })}
            </tbody>
        </table>
    )
}