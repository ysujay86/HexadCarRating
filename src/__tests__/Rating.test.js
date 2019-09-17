import Rating from '../components/Rating';
import React from 'react';
import ReactDOM from 'react-dom';
import RatingsHome from '../components/RatingsHome';
import { shallow, mount } from 'enzyme';
import { createStore } from "redux";
import { Provider } from "react-redux";
import mainReducer from "../reducers/mainReducer";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {  Modal } from 'react-bootstrap';
import App from '../App';
import { async } from 'rxjs/internal/scheduler/async';
Enzyme.configure({ adapter: new Adapter() });
const store = createStore(mainReducer);

it('renders the rating home', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>);
    expect(wrapper.find(RatingsHome).length).toEqual(1);
})

it('renders the rating list', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>);
    expect(wrapper.find(RatingsHome).find(Rating).length).toEqual(1);
})

it('renders all cars in list', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
    //check all cars are listed in Rating component
    expect(wrapper.find(RatingsHome).find(Rating).find('table tbody tr').length).toEqual(11);
})

it('check if list is ordered according to rating', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
    var rating1 = parseFloat(wrapper.find(RatingsHome).find(Rating).find('table tbody tr').at(0).find(".myrate").text());
    var rating2 = parseFloat(wrapper.find(RatingsHome).find(Rating).find('table tbody tr').at(1).find(".myrate").text());
    //rating of item 1 should be greater than or equal to item 2 for checking ordered list
    expect(rating1).toBeGreaterThanOrEqual(rating2);
})

it('opens the modal upon edit', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>);
    //find and click on first edit button in list
    const button = wrapper.find(RatingsHome).find(Rating).find('button').first();
    button.simulate('click');
    //check whether modal opens up
    expect(wrapper.find(Modal).prop('show')).toEqual(true);
})

it('close the modal upon close click', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>);
    //find and click on first edit button in list
    const button = wrapper.find(RatingsHome).find(Rating).find('button').at(0);
    button.simulate('click');
    expect(wrapper.find(Modal).prop('show')).toEqual(true);
    //check whether modal closes up using property show
    const closebutton = wrapper.find('#closeBtn').at(0);
    closebutton.simulate('click');
    expect(wrapper.find(Modal).prop('show')).toEqual(false);
})

it('Edit rating is successfull', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
    //store a car name to check rating after save
    const carname = wrapper.find(RatingsHome).find(Rating).find('table tbody tr').at(0).find(".carnamerow").text();
    //click on edit button at zero index
    const button = wrapper.find(RatingsHome).find(Rating).find('button').first();
    button.simulate('click');
    //get save button in modal pop up
    const savebutton = wrapper.find('.saverate').at(0);    
    //click save where 4.5 is default rating
    savebutton.simulate('click');
    //in the list loop through, get selected car and check rating = 4.5
    wrapper.find('.carrow').forEach((node) => {
        if (node.find('.carnamerow').text() == carname) {
            const rating = parseFloat(node.find(".myrate").text());
            console.log(rating);
            expect(rating == 4.5);
        }
    });
})

it("Random rating button is visible", () => {
    let wrapper = shallow(<RatingsHome/>);
    expect(wrapper.find('#toggleBtn').text()).toEqual("Start Random Rating");
})

it("Random rating button is clicked", () => {
    let wrapper = shallow(<RatingsHome/>);
    console.log(wrapper.find('#toggleBtn').text());
    wrapper.find('#toggleBtn').simulate('click');
    //After click state value of button text should change
    expect(wrapper.find('#toggleBtn').text()).toEqual("Stop Random Rating"); 
})


