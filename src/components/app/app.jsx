import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import {GameMode} from "../../const";
import {ActionCreator} from "../../reducer";

const GenreQuestionScreenWrapper = withActivePlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapper = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent {

  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step
    } = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onButtonClick={onWelcomeButtonClick}
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
  }

  render() {
    const {questions} = this.props;
    const [artistQuestion, genreQuestion] = questions;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
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
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
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
