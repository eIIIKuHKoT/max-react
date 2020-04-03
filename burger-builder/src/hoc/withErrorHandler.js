import React, {Component} from 'react';

import Modal from '../components/UI/Modal/Modal';
import Auxiliary from './Auxiliary';

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error})
      })
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }
    state = {
      error: null
    };
    errorConfirmedHandler = () => {
      this.setState({error: null})
    };
    
    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error}
                 modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
};

export default withErrorHandler;
