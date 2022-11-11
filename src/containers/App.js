import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
// import { robots } from "./robots";
import "./App.css";

// const App = () => {
//   return (
//     <div className="tc">
//       <h1>RoboFriends</h1>
//       <SearchBox />
//       <CardList robots={robots} />
//     </div>
//   );
// };

class App extends Component {
  //constructor
  constructor() {
    //call the component constructor
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  // mounting, will trigger auto
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    console.log(event.target.value);
    //set the state for searchfield
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
