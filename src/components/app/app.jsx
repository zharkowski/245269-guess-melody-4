import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import {GameMode} from "../../const";
import {ActionCreator} from "../../reducer";

const GenreQuestionScreenWrapper = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapper = withActivePlayer(ArtistQuestionScreen);

const App = React.memo((props) => {
  const {
    questions,
    mistakesCount,
    maxMistakes,
    onUserAnswer,
    onWelcomeButtonClick,
    step
  } = props;
  const [artistQuestion, genreQuestion] = questions;
  const renderGameScreen = () => {
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakesCount >= maxMistakes) {
      return (
        <GameOverScreen onRetryButtonClick={() => {}}/>
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          onRetryButtonClick={() => {}}
          questionsCount={questions.length}
          mistakesCount={mistakesCount}
        />
      );
    }

    if (question) {
      switch (question.mode) {
        case GameMode.ARTIST:
          return (
            <GameScreen mode={question.mode}>
              <ArtistQuestionScreenWrapper
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameMode.GENRE:
          return (
            <GameScreen mode={question.mode}>
              <GenreQuestionScreenWrapper
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderGameScreen()}
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestionScreenWrapper
            onAnswer={() => {}}
            question={artistQuestion}
          />
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreenWrapper
            onAnswer={() => {}}
            question={genreQuestion}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});

App.displayName = `App`;

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
  mistakesCount: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
