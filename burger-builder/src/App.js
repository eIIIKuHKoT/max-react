import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});


const App = props => {
  
  useEffect(() => {
    props.onTryAutoLogin();
  }, []);
  
  let routs = (
    <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  );
  if (props.isAuthenticated) {
    routs = (
      <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )
  }
  
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routs}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
