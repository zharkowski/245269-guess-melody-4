import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import withActivePlayer from "../../hocs/with-audio-player/with-audio-player";
import {GameMode} from "../../const";

const GenreQuestionScreenWrapper = withActivePlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapper = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
    };
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
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
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
              />
            </GameScreen>
          );
        case GameMode.GENRE:
          return (
            <GameScreen mode={question.mode}>
              <GenreQuestionScreenWrapper
                question={question}
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
