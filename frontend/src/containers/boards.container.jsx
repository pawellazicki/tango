import React, { useState, useEffect } from 'react';
import Board from '../components/Board.component';
import Loading from '../components/Loading.component';
import './boards.container.css';
import {fetchBoards} from '../API/BoardsAPI';


export default function Boards() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBoards().then(result => {
            setData(result);
            setLoading(false);
        })
    }, []);

    return (
        <div className="tabs-container">
            <h2 className="myBoards">My Boards</h2>
            <div className="tabs">
                {
                loading ? <Loading/> : data.map(board => (
                    <Board key={board.id} title={board.title} team={board.team_name}></Board>
                ))}
            </div>
        </div>
    )
}
