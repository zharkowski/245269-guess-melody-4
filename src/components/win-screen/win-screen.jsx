import React from "react";
import PropTypes from "prop-types";

const WinScreen = (props) => {
  const {onRetryButtonClick, questionsCount, mistakesCount} = props;
  const correctAnswersCount = questionsCount - mistakesCount;
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctAnswersCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button className="replay" type="button" onClick={onRetryButtonClick}>Сыграть ещё раз</button>
    </section>
  );
};

WinScreen.propTypes = {
  onRetryButtonClick: PropTypes.func.isRequired,
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
};

export default WinScreen;
