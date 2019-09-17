import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Rating from './Rating';
import { Subject } from 'rxjs';

var eventStream = new Subject();
var randomRatingStarted = false;
class RatingsHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomRatingStarted: false,
            randomRatingCar: "",
            randomRatingData: {
                "carid": 0,
                "carrating": 0
            }
        }
    }    

    randomRate() {
        let ref = this,
            timeout = null;
        //toggle button status
        randomRatingStarted = !randomRatingStarted;
        (function push() {
            if (randomRatingStarted == true) {
                ref.setState({ randomRatingStarted: true });
                timeout = setTimeout(
                    () => {
                        eventStream.next(ref.getRandomRating());
                        push();
                    },
                    ref.getRandomTime()
                );
            }
            else{
                ref.setState({ randomRatingStarted: false });
            }
        })();

        var subscription = eventStream.subscribe(
            function (rating) {
                let randomCarIdToRate = ref.getRandomCarId();
                ref.props.onSaveRating(randomCarIdToRate, rating);
                console.log("random rating after random time is  " + rating);
                ref.setState({ randomRatingCar: ref.props.cars.filter((item) => item.id == 5)[0].name });
            },
            function (err) {
                console.log('Error: ' + err);
            },
            function () {
                console.log('Completed');
            });
    }

    getRandomRating() {
        var ratingarray = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
            randomRatingValue = ratingarray[Math.floor(Math.random() * ratingarray.length)];
        return randomRatingValue;
    }

    getRandomTime() {
        var min = 5,
            max = 10,
            rand = Math.floor(Math.random() * (max - min + 1) + min);
        return rand * 1000;
    }

    getRandomCarId() {
        var minId = Math.min.apply(null, this.props.cars.map(e => e.id)),
            maxId = Math.max.apply(null, this.props.cars.map(e => e.id)),
            randCarId = Math.floor(Math.random() * (maxId - minId + 1) + minId);
        return randCarId;
    }

    // Applications works in chrome browser, please refer package json for supported browsers
    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper">
                    <section className="content ">
                        <div className="card panel noborder watchlist">
                            <div className="card-body">
                                <Rating cars={this.props.cars} onSaveRating={this.props.onSaveRating} />
                                <br />
                                <ButtonToolbar>
                                    <div className="col-sm-2 toggleBtn"><Button onClick={this.randomRate.bind(this)} variant={this.state.randomRatingStarted == false ? "success" : "danger"} id="toggleBtn">{this.state.randomRatingStarted == false ? "Start Random Rating" : "Stop Random Rating"}</Button></div>
                                </ButtonToolbar>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
export default RatingsHome;