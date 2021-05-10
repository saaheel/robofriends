import React, { useState, useEffect } from 'react';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import { setSearchField } from '../action'

function App() {
    
  const [robots, setRobots] = useState([])
  const [count, setCount] = useState(0)
  const [searchField, setSearchField] = useState('')

  const onSearchChange = (event) => {
    setSearchField(event.target.value)
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {setRobots(users)} )
    console.log(count);
  },[count])    // runs only if count changes

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
  })
  return !robots.length ?
    <h1 className="tc">Loading</h1> : 
    (
      <div className="tc">
        <h1 className="f2">Robofriends</h1>
        <button onClick={()=>setCount(count+1)}>Click me!</button>
        <SearchBox onSearchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
}

export default App;
