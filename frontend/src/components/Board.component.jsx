import React from 'react';
import '../styles/Board.component.css';

function Board({ title, team }) {
    return (
        <div className="board">
            <h3>{title}</h3>
            <p>{team}</p>
        </div>
    );
}

export default Board;