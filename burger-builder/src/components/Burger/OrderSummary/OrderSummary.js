import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../../components/UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(key => {
        return <li key={key}><span
          style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
        </li>
      });
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><b>Total Price: {this.props.price.toFixed(2)}</b></p>
        <p>Continue to checkout</p>
        <Button
          buttonType={'Danger'}
          clicked={this.props.purchaseCanceled}
        >CANCEL</Button>
        <Button
          buttonType={'Success'}
          clicked={this.props.purchaseContinued}
        >CONTINUE</Button>
      </Auxiliary>
    )
  }
};

export default OrderSummary;
