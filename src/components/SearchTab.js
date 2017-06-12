import React, { Component } from 'react';
import MovieCard from './MovieCard';
import { Input, Row, Col } from 'antd';
import './SearchTab.css';
import 'antd/dist/antd.css';

const Search = Input.Search

class SearchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      favorites: props.favorites
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (nextProps !== this.props) ? true : false;
    var diffStates = (nextState.items !== this.state.items) ? true : false;
    console.log("SearchTab shouldComponentUpdate called. diffProps: " + diffProps + ", diffStates: " + diffStates);
    return (diffProps || diffStates);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("SearchTab componentWillUpdate called");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("SearchTab componentDidUpdate called");
  }
  componentDidMount() {
    console.log("SearchTab componentDidMount called");
  }

  updateSearch(value) {
    if (value) {
      var search = "";
      search = value.trim();
      search = search.replace(" ", "+");
      if (search !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=1a3874bc7afbfe23569075ab2c05108e&language=en-EN&page=1&include_adult=false&query=" + search);
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
  }

  render() {
    return (
      <div className="SearchTab">
        <Search
          className="SearchTab-searchbar"
          placeholder="Type a movie"
          style={{ width: 250 }}
          onSearch={ value => this.updateSearch(value) }
        />
        <div style={{display: "flex", justifyContent: "center"}}>
          {(this.state.items && this.state.items.length) ?
            <Row className="SearchTab-row-item" type="flex" justify="center">{this.state.items.map(
              item => (
                <Col className="SearchTab-col-item" key={"search-" + item.id} xs={24} sm={12} md={8} lg={6} xl={6}>
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

export default SearchTab;
