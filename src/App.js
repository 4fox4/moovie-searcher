import React, { Component } from 'react';
import MovieCard from './MovieCard';
import { Input, Row, Col, Icon } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import Logo from "./moovie_v2.png";

const Search = Input.Search

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (nextProps !== this.props) ? true : false;
    var diffStates = (nextState.items !== this.state.items) ? true : false;
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
    console.log("componentDidUpdate called");
  }

  updateSearch(value) {
    if (value) {
      var search = "";
      search = value.trim();
      search = search.replace(" ", "+");
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=1a3874bc7afbfe23569075ab2c05108e&language=fr-FR&page=1&include_adult=false&query=" + search);
      // xhr.withCredentials = true;
      // xhr.addEventListener("readystatechange", function () {
      xhr.onload = function(e){
        if (this.readyState === this.DONE) {
          var data = JSON.parse(xhr.response);
          this.setState({items: data.results});
          console.log(this.state.items);
        }
      }.bind(this);
      xhr.send(this.state.items);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" alt="logo app" src={Logo} />
        </div>
        <Search
          className="App-searchbar"
          placeholder="Type a movie"
          style={{ width: 250 }}
          onSearch={ value => this.updateSearch(value) }
        />
        <div style={{display: "flex", justifyContent: "center"}}>
          {this.state.items.length ?
            <Row className="App-row-item" type="flex" justify="center">{this.state.items.map(
              item => (
                <Col className="App-col-item" key={item.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                  <MovieCard movie={item} />
                </Col>
              ))}
            </Row>
            : <div>No results</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
