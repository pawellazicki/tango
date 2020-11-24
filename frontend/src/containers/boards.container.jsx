import React, { useState, useEffect } from 'react';
import Board from '../components/Board.component';
import Loading from '../components/Loading.component';
import './boards.container.css';
import {fetchBoards} from '../API/BoardsAPI';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logUserOut } from "../action/userActions"


export default function Boards() {
    
    const history = useHistory();
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleResponse = (response) => {
        if(response.statusCode === 400){
            history.push("/login")
            dispatch(logUserOut());
        }
    }

    useEffect(() => {
        fetchBoards(localStorage.getItem("token")).then(result => {
            console.log(data)
            handleResponse(result);
            setData(result.data);
        }).then(() => {
            setLoading(false);
        })
    }, [loading] );

    
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
