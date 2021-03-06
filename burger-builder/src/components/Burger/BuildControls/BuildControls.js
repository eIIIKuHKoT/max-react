import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Meat', type: 'meat'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
];

const buildControls = (props) => (
 
  <div className={classes.BuildControls}>
    <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
    {controls.map(control => (
      <BuildControl key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
      />
    ))}
    <button
      onClick={props.ordered}
      disabled={!props.purchasable}
      className={classes.OrderButton}
    >{props.isAuth ? 'ORDER NOW' : 'SIGN-UP TO ORDER'}</button>
  </div>


);

export default buildControls;
