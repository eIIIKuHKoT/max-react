import React, { Component } from "react";

import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../../components/UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <b>Total Price: {props.price.toFixed(2)}</b>
      </p>
      <p>Continue to checkout</p>
      <Button buttonType={"Danger"} clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button buttonType={"Success"} clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;
