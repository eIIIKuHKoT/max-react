import React, {Component} from "react";

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };
  sideDrawerOpenHandler = () => {
    this.setState((prevStet) => {
      return {showSideDrawer: !prevStet.showSideDrawer}
    });
  };
  
  
  render() {
    return (
      <Auxiliary>
        <Toolbar
          drawerToggleClicked={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}

export default Layout;
