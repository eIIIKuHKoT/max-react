import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    loading: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name..'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address..'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email..'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code..'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country..'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'vastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      },
      
    }
  };
  
  inputChangedHandler = (event, id) => {
    const orderForm = {
      ...this.state.orderForm
    };
    const orderFormElement = {...orderForm[id]}
    orderFormElement.value = event.target.value;
    orderForm[id] = orderFormElement;
    this.setState({orderForm})
  };
  
  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      deliveryMethod: 'fastest',
      orderData: formData
    };
    try {
      await axios.post('/orders.json', order);
      this.setState({loading: false});
      this.props.history.goBack();
    } catch (err) {
      this.setState({loading: false});
    }
  };
  
  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form =
      <form onSubmit={this.orderHandler}>
        {formElements.map(element => {
          return <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => this.inputChangedHandler(event, element.id)}
          />
        })}
        <Button buttonType="Success">Order</Button>
      </form>;
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
