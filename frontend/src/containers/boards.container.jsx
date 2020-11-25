import React, { useState, useEffect } from 'react';
import Board from '../components/Board.component';
import Loading from '../components/Loading.component';
import '../styles/boards.container.css';
import {fetchBoards} from '../API/BoardsAPI';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginSuccess, logUserOut } from "../action/userActions"
import {useSelector} from 'react-redux'
import TitleWithButton from '../components/TitleWithButton.component';
import NewBoard from '../components/NewBoard.component';


export default function Boards() {
    
    const userReducer = useSelector(state => state.userReducer)

    const history = useHistory();
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addTab, setAddTab] = useState(false);
    const [newTabTitle, setNewTabTitle] = useState('');
    const [newTabTeam, setNewTabTeam] = useState('');
    const [saveNewTab, setSaveNewTab] = useState(false);

    const handleResponse = async (response) => {
        if(response.statusCode === 401){
            history.push("/login")
            dispatch(logUserOut());
        }
    }

    const printBoards = (boardsData) => {
        return( 
            boardsData.map(board => 
                <Board title={board.TITLE} team={board.TEAM_NAME}></Board>
            )
        )
    }

    useEffect(() => {
        fetchBoards(localStorage.getItem("token")).then(result => {
            handleResponse(result);
            setData(result.data);
        }).then(() => {
            setLoading(false);
        }).catch(() => {
            dispatch(logUserOut());
            history.push("/login")
        })
    }, [] );

    
    return (
        <div className="tabs-container">
            <TitleWithButton addTab={addTab} setAddTab={setAddTab}></TitleWithButton>
            <div className="tabs">
                {loading ? 
                    <Loading/> : printBoards(data)}
                {addTab ? 
                    <NewBoard
                        newTabTitle={newTabTitle}
                        setNewTabTitle={setNewTabTitle}
                        newTabTeam={newTabTeam}
                        setNewTabTeam={setNewTabTeam}
                        setSaveNewTab={setSaveNewTab}/> 
                    : null}
            </div>
        </div>
    )
}
