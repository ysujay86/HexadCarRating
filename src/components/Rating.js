import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            carname: "",
            carrating: 0,
            carid: 0,
        }
    }

    open(item) {
        this.setState({ showModal: true, carrating: item.selfrating, carname: item.name, carid: parseFloat(item.id) });
    }

    close() {
        this.setState({ showModal: false });
    }

    //modal - save rating
    save() {
        let selectedRating = document.querySelector("input[name=rating]:checked") != null ? document.querySelector("input[name=rating]:checked").value : "4.5";
        this.props.onSaveRating(this.state.carid, selectedRating);
        this.setState({ showModal: false });
    }

    //on modal pop up open, to preset old rating from list for particular item
    onEntered() {
        if (this.state.carrating != 0) {
            let selector = this.state.carrating.toString();
            selector = selector.replace("0.5", "half");
            selector = selector.replace(".5", "half");
            document.getElementById("star" + selector).checked = true;
        }
    }

    //this is to populate table of all cars 
    populateTable(car, index) {
        return (
            <tr key={index} className="carrow">
                <td>{car.id}</td>
                <td className="carnamerow">{car.name}</td>
                <td>{car.type}</td>
                <td><span className="fa fa-star checked">{car.rating}</span></td>
                <td>
                    <span className={car.selfrating == 0 ? "fa fa-star col-sm-3 myrate" : "fa fa-star checked col-sm-3 myrate"}>{car.selfrating}</span>
                    <Button variant="primary" onClick={this.open.bind(this, car)}>
                        EDIT
                    </Button>
                </td>
            </tr>
        );
    }

    // Applications works in chrome browser, please refer package json for supported browsers
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Car ID</th>
                            <th>Car Name</th>
                            <th>Car Type</th>
                            <th>Avg. Customer Rating</th>
                            <th>My Rating &#8593;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cars && this.props.cars.map(this.populateTable, this)}
                    </tbody>
                </table>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} onEntered={this.onEntered.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.carname}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <fieldset className="rating">
                            <legend>Please rate</legend>
                            <input className="radio" type="radio" id="star5" name="rating" value="5" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
                            <input className="radio" type="radio" id="star4half" name="rating" value="4.5" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                            <input className="radio" type="radio" id="star4" name="rating" value="4" /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                            <input className="radio" type="radio" id="star3half" name="rating" value="3.5" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                            <input className="radio" type="radio" id="star3" name="rating" value="3" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
                            <input className="radio" type="radio" id="star2half" name="rating" value="2.5" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                            <input className="radio" type="radio" id="star2" name="rating" value="2" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                            <input className="radio" type="radio" id="star1half" name="rating" value="1.5" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                            <input className="radio" type="radio" id="star1" name="rating" value="1" /><label className="full" htmlFor="star1" title="Very bad - 1 star"></label>
                            <input className="radio" type="radio" id="starhalf" name="rating" value="0.5" /><label className="half" htmlFor="starhalf" title="Very bad - 0.5 stars"></label>
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="saverate" onClick={this.save.bind(this)}>Save</Button>
                        <Button id="closeBtn" onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default Rating;