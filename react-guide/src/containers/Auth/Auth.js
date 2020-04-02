import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email..'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password..'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };
  
  switchAuthModeHandler = () => {
    this.setState((prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    }))
  };
  
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid
    }
    return isValid;
  }
  
  inputChangedHandler = (event, controlName) => {
    const controls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value,
          this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls})
  };
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    )
  };
  
  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }
  
  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = formElements.map(element => {
        return <Input
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          changed={(event) => this.inputChangedHandler(event, element.id)}
          invalid={!element.config.valid}
          touched={element.config.touched}
          shouldValidate={element.config.validation}
        />;
      }
    );
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.authRedirectPath}/>
    }
    if (this.props.loading) {
      form = <Spinner/>
    }
    let error = null;
    if (this.props.error) {
      error = <p>{this.props.error.message}</p>
    }
    
    return (
      <div className={classes.Auth}>
        {error}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            buttonType="Success"
            //    disabled={!this.state.formIsValid}
          >Submit</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          buttonType='Danger'
        >SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}</Button>
        {redirect}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/'))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
