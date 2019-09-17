import Rating from '../components/Rating';
import React from 'react';
import ReactDOM from 'react-dom';
import RatingsHome from '../components/RatingsHome';
import { shallow, mount } from 'enzyme';
import { createStore } from "redux";
import { Provider } from "react-redux";
import mainReducer from "../reducers/mainReducer";
const store = createStore(mainReducer);
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App from '../App';

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

it('renders all cars in list and check if ordered according to rating', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
    //check all cars are listed in Rating component
    expect(wrapper.find(RatingsHome).find(Rating).find('table tbody tr').length).toEqual(11);
    var rating1 = parseFloat(wrapper.find(RatingsHome).find(Rating).find('table tbody tr').at(0).find(".myrate").text());
    var rating2 = parseFloat(wrapper.find(RatingsHome).find(Rating).find('table tbody tr').at(1).find(".myrate").text());
    //rating of item 1 should be greater than or equal to item 2 for checking ordered list
    expect(rating1).toBeGreaterThanOrEqual(rating2);
})

it('opens the new modal upon edit', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>);
    //find and click on first edit button in list
    const button = wrapper.find(RatingsHome).find(Rating).find('button').first();
    button.simulate('click');
    //check whether modal opens up and modal title appears
    const text = wrapper.find('ModalTitle');
    expect(text.length).toBe(1);
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
    //click on rating star 4.5 present at index 1
    wrapper.find('.rating').find("input").at(1).simulate('click');
    //click save after rating
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


it("Random rating works", () => {        
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const cars = wrapper.find('.carrow');
    var i = 0;
    console.log(cars.at(i).find('.carnamerow').text());
    const randomratingbutton = wrapper.find(RatingsHome).find('.toggleBtn').first();
    randomratingbutton.simulate('click');
    //after 5 seconds, loop through and check if ordered list changes at any position to confirm random rating works. Also log which car has changed random rating 
    setTimeout(()=>{
        wrapper.find('.carrow').forEach((node) => {
            console.log(cars.at(i).find('.carnamerow').text());
            if (node.find('.carnamerow').text() != cars.at(i).find('.carnamerow').text()) {
                console.log(cars.at(i).find('.carnamerow').text());
                //expect(rating == 4.5);
            }
            console.log("i is " + i);
            i++;
        });
    }, 6000);    

})


