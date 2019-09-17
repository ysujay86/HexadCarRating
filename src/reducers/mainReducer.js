import * as data from '../dataset/cars.json';
let carsData = data.default.sort(function(a, b){return b.selfrating-a.selfrating});
const initialState = {
    cars: carsData
  };
  
  const mainReducer = (state = initialState, action) => {
    if (action.type === "SAVE_RATING") {
        let index = state.cars.map(e => e.id).indexOf(action.carData.carId);
        state.cars[index]["selfrating"] = action.carData.carRating;
        state.cars = state.cars.sort(function(a, b){return b.selfrating-a.selfrating});
        return {
            ...state,
          };
    }
    else{
        return state;
    }
  };
  
  export default mainReducer;