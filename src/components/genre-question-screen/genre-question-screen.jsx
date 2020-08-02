import React from "react";
import PropTypes from "prop-types";
import {GameMode} from "../../const";
import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";

class GenreQuestionScreen extends React.PureComponent {
  render() {
    const {onAnswer, onChange, question, renderPlayer, userAnswers} = this.props;
    const {genre, answers} = question;
    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >
          {answers.map((answer, index) => (
            <GenreQuestionItem
              key={`${index}-${answer.src}`}
              answer={answer}
              id={index}
              onChange={onChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[index]}
            />
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: PropTypes.shape({
    mode: PropTypes.oneOf([GameMode.ARTIST, GameMode.GENRE]).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        })).isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default GenreQuestionScreen;
