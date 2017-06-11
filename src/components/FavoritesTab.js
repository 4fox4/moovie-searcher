import React, { Component } from 'react';
import MovieCard from './MovieCard';
import { Row, Col } from 'antd';
import './FavoritesTab.css';
import 'antd/dist/antd.css';

import { connect } from 'react-redux';

class FavoritesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (nextProps.favorites !== this.props.favorites) ? true : false;
    var diffStates = (nextState !== this.state) ? true : false;
    console.log("FavoritesTab shouldComponentUpdate called. diffProps: " + diffProps + ", diffStates: " + diffStates);
    return (diffProps || diffStates);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("FavoritesTab componentWillUpdate called");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("FavoritesTab componentDidUpdate called");
  }
  componentDidMount() {
    console.log("FavoritesTab componentDidMount called");
  }

  render() {
    return (
      <div className="FavoritesTab">
        <div style={{display: "flex", justifyContent: "center"}}>
          {this.props.favorites.length ?
            <Row className="FavoritesTab-row-item" type="flex" justify="center">{this.props.favorites.map(
              favorite => (
                <Col className="FavoritesTab-col-item" key={"favorites-" + favorite.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                  <MovieCard favorites={this.props.favorites} movie={favorite} />
                </Col>
              ))}
            </Row>
            : <div>No favorites</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: state.favorites
  }
};

export default FavoritesTab = connect(mapStateToProps)(FavoritesTab);
