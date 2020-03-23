import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.5,
  bacon: 0.8,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };
  
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  };
  
  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients)
  };
  
  removeIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount >= 0 ? updatedCount : 0;
    let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState(
      {
        totalPrice: newPrice >= 0 ? newPrice : 0,
        ingredients: updatedIngredients
      });
    this.updatePurchaseState(updatedIngredients)
  };
  
  purchaseHandler = () => {
    this.setState({purchasing: true});
  };
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };
  
  purchaseContinueHandler = async () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      const response = await  axios.post('/orders.json', order);
      console.log(response)
      this.setState({loading: false, purchasing: false});
    } catch (err) {
      this.setState({loading: false, purchasing: false});
      console.log(err)
    }
  };
  
  render() {
    let disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary
      price={this.state.totalPrice}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      ingredients={this.state.ingredients}
    />;
    if(this.state.loading){
      orderSummary = <Spinner/>
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable}
        />
      </Auxiliary>
    
    
    )
  }
  
}

export default withErrorHandler(BurgerBuilder, axios);
