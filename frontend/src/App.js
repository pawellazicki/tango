import React, { Component } from 'react';
import logo from './logo.svg';
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
        <NavBar/>
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
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Data from the Backend</h1>
          {this.state.data.map(city => (
            <p key={city.ID}>
              Name: {city.Name} <br />
              CountryCode: {city.CountryCode} <br />
              District: {city.District} <br />
              Population: {city.Population} <br />
            </p>
          ))}
        </header> */}
      </div>
    );
  }
}

export default App;
