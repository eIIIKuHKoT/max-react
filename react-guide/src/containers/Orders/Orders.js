import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };
  
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        let orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          })
        }
        this.setState({orders})
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
