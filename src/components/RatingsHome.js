import React from 'react';
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';
import Rating from './Rating';
import { Subject, Observable } from 'rxjs';


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

    componentDidMount() {
        var eventStream = new Subject();
        let ref = this;
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

        var my_function = function () {
            var randomRatingRunningStatus = ref.state.randomRatingStarted;
            ref.setState({ randomRatingStarted: !randomRatingRunningStatus })
            let timeout = null;

            (function push() {
                if (ref.state.randomRatingStarted == true) {
                    timeout = setTimeout(
                        () => {
                            eventStream.next(ref.getRandomRating());
                            push();
                        },
                        ref.getRandomTime()
                    );
                }
            })();
        }

        if (document.getElementById('toggleBtn') != null ||
            document.getElementById('toggleBtn') != undefined) {
            document.getElementById("toggleBtn").onclick = my_function;
        }
    }

    getRandomRating() {
        var min = 0.5,
            max = 5.0,
            ratingarray = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
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

    sendMessage() {
        debugger;
        let ref = this;
        const stopButton = document.querySelector('#stop-button');
        // send message to subscribers via observable subject
        //messageService.sendMessage(this.state.random);
        var ob = new Observable(sub => {
            let timeout = null;

            // recursively send a random number to the subscriber
            // after a random delay
            (function push() {
                timeout = setTimeout(
                    () => {
                        sub.next(ref.getRandomRating());
                        push();
                    },
                    ref.getRandomTime()
                );
            })();

            // clear any pending timeout on teardown
            return () => clearTimeout(timeout);
        });

        ob.subscribe(rating => {
            ref.props.onSaveRating(ref.getRandomCarId(), rating);
            console.log("random rating after random time is  " + rating);
            this.setState({ randomRatingCar: true });
        });

        // const stopSubscription = Rx.Observable
        //     .fromEvent(stopButton, 'click')
        //     .subscribe(
        //         () => {
        //             intervalSubscription.unsubscribe();
        //             stopSubscription.unsubscribe();
        //         },
        //         (error) => console.error(error),
        //         () => console.log('Click listener completed')
        //     );
    }

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
                                    <div className="col-sm-2 toggleBtn"><Button variant={this.state.randomRatingStarted == false ? "success" : "danger"} id="toggleBtn">{this.state.randomRatingStarted == false ? "Start Random Rating" : "Stop Random Rating"}</Button></div>
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