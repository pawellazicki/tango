import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        <header className="App-header">
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
        </header>
      </div>
    );
  }
}

export default App;
