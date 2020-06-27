import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const App = (props) => {
  const {errorsCount} = props;
  const buttonClickHandler = () => {};
  return (
    <WelcomeScreen
      errorsCount={errorsCount}
      welcomeButtonClickHandler={buttonClickHandler}
    />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
