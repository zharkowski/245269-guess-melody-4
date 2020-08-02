import {extend} from "./utils";
import {ActionType, GameMode} from "./const";
import questions from "./mocks/questions";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions,
};

const isArtistAnswerCorrect = (question, userAnswer) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (question, userAnswer) => userAnswer.every(
    (it, i) => it === (question.answers[i].genre === question.genre)
);

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer) => {
    let isAnswerCorrect = false;

    switch (question.mode) {
      case GameMode.ARTIST:
        isAnswerCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameMode.GENRE:
        isAnswerCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;
      return extend(state, {
        mistakes,
      });

    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;
      return extend(state, {
        step: nextStep,
      });
    default:
      return state;
  }
};

export {reducer, ActionCreator};
