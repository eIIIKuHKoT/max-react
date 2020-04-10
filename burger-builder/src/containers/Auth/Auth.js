import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import classes from "./Auth.module.css";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = ({
  buildingBurger,
  authRedirectPath,
  onSetAuthRedirectPath,
  ...props
}) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email..",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password..",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const formElements = [];
  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key],
    });
  }
  let form = formElements.map((element) => {
    return (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        changed={(event) => inputChangedHandler(event, element.id)}
        invalid={!element.config.valid}
        touched={element.config.touched}
        shouldValidate={element.config.validation}
      />
    );
  });
  let redirect = null;
  if (props.isAuthenticated) {
    redirect = <Redirect to={props.authRedirectPath} />;
  }
  if (props.loading) {
    form = <Spinner />;
  }
  let error = null;
  if (props.error) {
    error = <p>{props.error.message}</p>;
  }

  return (
    <div className={classes.Auth}>
      {error}
      <form onSubmit={submitHandler}>
        {form}
        <Button
          buttonType="Success"
          //    disabled={!state.formIsValid}
        >
          Submit
        </Button>
      </form>
      <Button clicked={switchAuthModeHandler} buttonType="Danger">
        SWITCH TO {isSignUp ? "SIGN-IN" : "SIGN-UP"}
      </Button>
      {redirect}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
