import {useReducer, useCallback} from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
}
const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {loading: true, error: null, data: null, extra: null, identifier: action.identifier};
    case 'RESPONSE':
      return {...httpState, loading: false, data: action.data, extra: action.extra};
    case 'ERROR':
      return {loading: false, error: action.error};
    case 'CLEAR':
      return initialState;
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};


const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
  
  const clear = useCallback(() => {
    dispatchHttp({type: 'CLEAR'});
  }, [])
  
  const sendRequest = useCallback(async (url, method, body, requestExtra, identifier) => {
    dispatchHttp({type: 'SEND', identifier: identifier});
    try {
      const response = await fetch(url, {
        method,
        body,
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      dispatchHttp({type: 'RESPONSE', data, extra: requestExtra});
    } catch (error) {
      dispatchHttp({type: 'ERROR', error: error.message});
    }
  }, [])
  
  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    requestExtra: httpState.extra,
    identifier: httpState.identifier,
    clear: clear
  }
  
}

export default useHttp;
