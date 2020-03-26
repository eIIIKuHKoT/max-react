import React, {Component} from 'react';
import {connect} from 'react-redux';


import * as actions from '../../store/actions';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';


class BurgerBuilder extends Component {
  state = {
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
    return sum > 0;
  };
  
  purchaseHandler = () => {
    this.setState({purchasing: true});
  };
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };
  
  purchaseContinueHandler = async () => {
    this.props.history.push('/checkout');
  };
  
  /*componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      }).catch(err => {
      console.log(err)
    });
  };*/
  
  render() {
    let orderSummary = null;
    let burger = <Spinner/>;
    
    if (this.props.ings) {
      let disabledInfo = {
        ...this.props.ings
      };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      burger = (<Auxiliary>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          price={this.props.price}
          disabled={disabledInfo}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          ordered={this.purchaseHandler}
          purchasable={this.updatePurchaseState(this.props.ings)}
        />
      </Auxiliary>);
      orderSummary = <OrderSummary
        price={this.props.price}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings}
      />;
    }
    if (this.state.loading) {
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
        {burger}
      </Auxiliary>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
