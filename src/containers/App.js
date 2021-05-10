import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import { setSearchField, requestRobots } from '../action'

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component{

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     robots: []
  //   }
  // }
  
  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ robots: users }) )
    this.props.onRequestRobots()
  }

  // onSearchChange = (event) => {
  //   this.setState({ searchField: event.target.value });
  // }

  render(){
    // const { robots } = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
    })
    return isPending ?
      <h1 className="tc">Loading</h1> : 
      (
        <div className="tc">
          <h1 className="f2">Robofriends</h1>
          <SearchBox onSearchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);
