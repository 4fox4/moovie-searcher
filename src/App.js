import React, { Component } from 'react';
import SearchTab from './SearchTab';
import FavoritesTab from './FavoritesTab';
import { Tabs, Icon } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
// import Logo from "./moovie_v5.png";

const TabPane = Tabs.TabPane;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (nextProps !== this.props) ? true : false;
    var diffStates = (nextState.favorites !== this.state.favorites) ? true : false;
    console.log("shouldComponentUpdate called. diffProps: " + diffProps + ", diffStates: " + diffStates);
    return (diffProps || diffStates);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate called");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate called");
  }
  componentDidMount() {
    if (localStorage.getItem("favorites"))
      var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.length) {
      this.setState({"favorites": favorites});
    }
    console.log(this.state.favorites);
    console.log("componentDidMount called");
  }

  // <img className="App-logo" alt="logo app" src={Logo} />

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Moovie Searcher</h1>
        </div>
        <Tabs
          className="App-tabs"
          defaultActiveKey="1"
          tabBarStyle={{
            border: "inherit",
            backgroundColor: "rgba(45, 68, 90, 0.56)",
            display: "flex",
            justifyContent: "center"
          }}>
          <TabPane tab={<span><Icon type="search" />Search</span>} key="1">
            <SearchTab />
          </TabPane>
          <TabPane tab={<span><Icon type="heart" />Favorites</span>} key="2">
            <FavoritesTab favorites={this.state.favorites} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
