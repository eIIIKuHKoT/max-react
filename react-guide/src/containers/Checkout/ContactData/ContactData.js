import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };
  
   orderHandler = async (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.props.price,
      customer: {
        name: 'John Doe',
        address: {
          street: 'Pobedu Ave',
          zipCode: '14000',
          country: 'Ukraine'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    };
    try {
      await axios.post('/orders.json', order);
      this.setState({loading: false});
    } catch (err) {
      this.setState({loading: false});
    }
  };
  
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name"/>
          <input type="email" name="email" placeholder="Your email"/>
          <input type="text" name="street" placeholder="Your address"/>
          <input type="number" name="postalCode" placeholder="Your Postal Code"/>
          <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
