import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";

const App = (props) => {
  const {errorsCount, questions} = props;
  const [artistQuestions, genreQuestions] = questions;
  const buttonClickHandler = () => {};
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsCount={errorsCount}
            welcomeButtonClickHandler={buttonClickHandler}/>
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestionScreen
            questions={artistQuestions}
          />
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreen
            questions={genreQuestions}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
