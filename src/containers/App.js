import React, { Component } from 'react';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      robots: [],
      searchField: ''
    }
  }
  
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState({ robots: users }) )
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render(){
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
    })
    return !robots.length ?
      <h1 className="tc">Loading</h1> : 
      (
        <div className="tc">
          <h1 className="f2">Robofriends</h1>
          <SearchBox onSearchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default App;
