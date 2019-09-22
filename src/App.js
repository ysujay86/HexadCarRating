import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import './Styles/myStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import RatingsHome from './components/RatingsHome';

// Applications works in chrome browser and not in IE, please refer package json for supported browsers
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <RatingsHome
          cars={this.props.cars}
          onSaveRating={this.props.onSaveRating}
        />
      </div>
    );
  }
}

//method that copies part of the state to the props of this component.
const mapStateToProps = stateFromStore => {
  return {
    cars: stateFromStore.cars,
  };
};

//currying the dispatch method of the store for invocation at a later stage when the user interacts with the component
const mapDispatchToProps = dispatch => {
  return {
    onSaveRating: (carId,carRating) => {
      //this function will be accessible via props in the component
      dispatch({
        type: "SAVE_RATING",
        carData: {
          carId,
          carRating
        }
      });
    }  
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
