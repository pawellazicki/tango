import React, { Component } from 'react';
import './App.css';
import Board from "./Board";
import NavBar from './NavBar';

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.fetchData()
      .then(res => this.setState({
        data: [res]
      }))
      .catch(err => console.log(err));
  }

  fetchData = async () => {
    const response = await fetch('/city');
    const body = response.json();
    return body;
  };

  render() {
    return (
      <div className="App">
        <NavBar />
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
      </div>
    );
  }
}

export default App;
