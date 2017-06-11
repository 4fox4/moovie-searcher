import React, { Component } from 'react';
import SearchTab from './SearchTab';
import FavoritesTab from './FavoritesTab';
import { Tabs, Icon } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
// import Logo from "./moovie_v5.png";

import { connect } from 'react-redux';
import { setFavorites } from '../actions'

const TabPane = Tabs.TabPane;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (nextProps.favorites !== this.props.favorites) ? true : false;
    var diffStates = (nextState !== this.state) ? true : false;
    console.log("App shouldComponentUpdate called. diffProps: " + diffProps + ", diffStates: " + diffStates);
    return (diffProps || diffStates);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("App componentWillUpdate called");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("App componentDidUpdate called");
  }
  componentDidMount() {
    if (localStorage.getItem("favorites"))
      var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.length) {
      this.props.dispatch(setFavorites(favorites));
      // this.setState({"favorites": favorites});
    }
    console.log("App componentDidMount called");
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
            <SearchTab favorites={this.props.favorites} />
          </TabPane>
          <TabPane tab={<span><Icon type="heart" />Favorites</span>} key="2">
            <FavoritesTab favorites={this.props.favorites} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: state.favorites
  }
};

export default App = connect(mapStateToProps)(App);
