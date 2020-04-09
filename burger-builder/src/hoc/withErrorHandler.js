import React, {Component, useEffect, useState} from 'react';

import Modal from '../components/UI/Modal/Modal';
import Auxiliary from './Auxiliary';

const withErrorHandler = (WrapperComponent, axios) => {
  return props => {
    
    const [error, setError] = useState(null);
    
    const requestInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const responseInterceptor = axios.interceptors.response.use(res => res, err => {
      setError({err})
    })
    
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      }
    }, [requestInterceptor, responseInterceptor])
    
    const errorConfirmedHandler = () => {
      setError(null)
    };
    
    return (
      <Auxiliary>
        <Modal show={error}
               modalClosed={errorConfirmedHandler}
        >
          {error ? error.message : null}
        </Modal>
        <WrapperComponent {...props} />
      </Auxiliary>
    )
  }
};

export default withErrorHandler;
