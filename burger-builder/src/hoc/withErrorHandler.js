import React, from "react";

import Modal from "../components/UI/Modal/Modal";
import Auxiliary from "./Auxiliary";
import useHttpErrorHandler from "../hooks/http-error";

const withErrorHandler = (WrapperComponent, axios) => {
  
  const [error, clearError] = useHttpErrorHandler(axios);
  
  return (props) => {
    return (
      <Auxiliary>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrapperComponent {...props} />
      </Auxiliary>
    );
  };
};

export default withErrorHandler;
