import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions'
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    loading: false
  };
  
  componentDidMount() {
    this.props.onFetchOrders();
  }
  
  render() {
    
    let orders = <Spinner/>;
    if (this.props.orders.length) {
      orders = <div>
        {this.props.orders.map(order => {
          return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        })}
      </div>
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
