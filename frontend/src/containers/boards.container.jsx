import React from 'react'
import Board from '../components/Board.component'
import '../styles/App.css';

export default function Boards() {
    return (
        <div className="tabs-container">
            <h2 className="myBoards">My Boards</h2>
            <div className="tabs">
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
                <Board title="tablica" team="tango"></Board>
            </div>
        </div>
    )
}
