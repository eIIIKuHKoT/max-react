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
    axios.get('/orders.js')
      .then(res => {
        let orders = [];
        for(let key in res.data) {
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
        <Order/>
        <Order/>
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
