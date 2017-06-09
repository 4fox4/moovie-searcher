import React, { Component } from 'react';
import './MovieCard.css';
import { Card, Rate, Tag, Button } from 'antd';
import 'antd/dist/antd.css';
// import update from 'react-addons-update';
// import update from 'immutability-helper';

import { connect } from 'react-redux';
import { addFavorite } from '../actions'

// import App from './App';

const imagePath = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.movie,
      favorites: props.favorites
    };
    this.addFavoriteToStore = this.addFavoriteToStore.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (nextProps.favorites !== this.props.favorites) ? true : false;
    var diffStates = (nextState !== this.state) ? true : false;
    console.log("MovieCard shouldComponentUpdate called. diffProps: " + diffProps + ", diffStates: " + diffStates);
    return (diffProps || diffStates);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("MovieCard componentWillUpdate called");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("MovieCard componentDidUpdate called");
  }
  componentDidMount() {
    console.log("MovieCard componentDidMount called");
  }

  dateConverter(value) {
    var date = new Date(this.state.movie.release_date);
    var options = {year: "numeric", month: "long", day: "numeric"};
    return date.toLocaleDateString("en-EN", options);
  }

  getMovieGenre(ids) {
    var tabIdGenres = [28,12,16,35,80,99,18,10751,14,36,27,10402,9648,10749,878,10770,53,10752,37]
    var genres = [
      {"id":28,"name":"Action", "color": "red"},
      {"id":12,"name":"Adventure", "color": "green"},
      {"id":16,"name":"Animation", "color": "blue"},
      {"id":35,"name":"Comedy", "color": "pink"},
      {"id":80,"name":"Crime", "color": "red"},
      {"id":99,"name":"Documentary", "color": "cyan"},
      {"id":18,"name":"Drama", "color": "purple"},
      {"id":10751,"name":"Family", "color": "orange"},
      {"id":14,"name":"Fantasy", "color": "pink"},
      {"id":36,"name":"History", "color": "orange"},
      {"id":27,"name":"Horror", "color": "purple"},
      {"id":10402,"name":"Music", "color": "cyan"},
      {"id":9648,"name":"Mystery", "color": "purple"},
      {"id":10749,"name":"Romance", "color": "pink"},
      {"id":878,"name":"Science Fiction", "color": "blue"},
      {"id":10770,"name":"TV Movie", "color": "orange"},
      {"id":53,"name":"Thriller", "color": "purple"},
      {"id":10752,"name":"War", "color": "red"},
      {"id":37,"name":"Western", "color": "orange"}
    ];
    for (var i in ids)
      for (var j in tabIdGenres)
        if (ids[i] === tabIdGenres[j])
          ids[i] = j;
    const tags = ids.map(currentId => (
      <Tag className="MovieCard-body-tag-genre"
        key={"tag-" + genres[currentId].name + currentId}
        color={genres[currentId].color}>
        {genres[currentId].name}
      </Tag>
    ));
    return (tags);
  }

  favoriteChecker(id) {
    for (var i in this.props.favorites) {
      if (this.props.favorites[i].id === id)
        return (true);
    }
    return (false);
  }

  addFavoriteToStore() {
    console.log("addFavorite called");
    console.log(this.props.favorites);
    this.props.dispatch(addFavorite(this.movie));
    // console.log(this.state.favorites);
    //
    // var newArray = update(this.state.favorites, {$push: [this.state.movie]});
    //
    // console.log(this.state.favorites);
    //
    // localStorage.setItem("favorites", JSON.stringify(newArray));
    // this.setState({"favorites": newArray});
  }

  deleteFavorite() {
    console.log("deleteFavorite called");
  }

  render() {
    console.log("render called");
    return (
      <Card className="MovieCard-card"
        bodyStyle={{ padding: 0, display: "flex", backgroundColor: "#2D445A" }}
        style={{ width: 290 }}
        bordered={false}
        extra={this.favoriteChecker(this.state.movie.id) ?
          <Button onClick={0} shape="circle" icon="heart" /> :
          <Button onClick={this.addFavoriteToStore} shape="circle" icon="heart-o" />
        }>
        <div className="MovieCard-image-container">
          <div className="MovieCard-image"
            style={{
              backgroundImage: "url("+imagePath+this.state.movie.poster_path+")",
              backgroundSize: "cover"
            }}>
          </div>
        </div>
        <div className="MovieCard-body-container">
          <h3 className="MovieCard-body-title">{this.state.movie.title}</h3>
          <h4 className="MovieCard-body-condensed">Rate</h4>
          <Rate allowHalf disabled defaultValue={this.state.movie.vote_average/2} />
          <h4 className="MovieCard-body-condensed">Overview</h4>
          <p className="MovieCard-body-overview">{this.state.movie.overview}</p>
          <h4 className="MovieCard-body-condensed">Release date</h4>
          <p>{this.dateConverter(this.state.movie.release_date)}</p>
          <h4 className="MovieCard-body-condensed">Genre</h4>
          <div>{this.getMovieGenre(this.state.movie.genre_ids)}</div>
        </div>

      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: state.favorites
  }
};

export default MovieCard = connect(mapStateToProps)(MovieCard);
