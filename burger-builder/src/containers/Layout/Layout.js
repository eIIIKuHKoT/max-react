import React, {useState} from "react";
import {connect} from "react-redux";

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevVal) => !prevVal);
  };
  
  return (
    <Auxiliary>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Auxiliary>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

export default connect(mapStateToProps)(Layout);
