import React, { useState, useEffect } from "react";
import "../styles/boardTitle.component.css";

export default function BoardTitle ({boardTitle, setBoardTitle}) {
  const DELAY = 2000
  const [title, setNewTitle] = useState("")
  const [timeout, setTime] = useState(null)

  useEffect(() => {
    setNewTitle(boardTitle);
}, [boardTitle])

  const setTitle = (newTitle) => {
    setNewTitle(newTitle)

    if(timeout)
      clearTimeout(timeout)
    
    setTime(setTimeout(() => {
      setBoardTitle(newTitle)
    }, DELAY))
  }

  return (
    <div style={{margin: "0 2vw"}}>
      <input 
        className="inputBoardTitle" 
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder={"Board Title"}
        type="text"/>
    </div>
  )
}