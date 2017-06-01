import React, { Component } from 'react';
import './MovieCard.css';
import { Card, Rate, Tag } from 'antd';
import 'antd/dist/antd.css';

const imagePath = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.movie
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

  dateConverter(value) {
    var date = new Date(this.state.movie.release_date);
    var options = {year: "numeric", month: "long", day: "numeric"};
    return date.toLocaleDateString("en-EN", options);
  }

  getMovieGenre(ids) {
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
    const items = genres.map(genre => {
      for (var i in ids)
        if (ids[i] === genre.id)
          return (
            <Tag className="MovieCard-body-tag-genre"
              key={i}
              color={genre.color}>
              {genre.name}
            </Tag>
          );
    });
    return items;
  }

  render() {
    return (
      <Card className="MovieCard-card"
        bodyStyle={{ padding: 0, display: "flex", backgroundColor: "#2D445A" }}
        style={{ width: 290 }}
        bordered={false}>

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

export default MovieCard;
