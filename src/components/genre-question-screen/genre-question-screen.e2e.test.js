import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  question: {
    mode: `genre`,
    genre: `rock`,
    answers: [{
      src: `path`,
      genre: `rock`,
    }, {
      src: `path`,
      genre: `blues`,
    }, {
      src: `path`,
      genre: `jazz`,
    }, {
      src: `path`,
      genre: `blues`,
    }],
  },
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const genreQuestionScreen = mount(
      <GenreQuestionScreen
        onAnswer={onAnswer}
        question={question}
        renderPlayer={() => {}}
        onChange={() => {}}
        userAnswers={[false, false, false, false]}
      />
  );

  const form = genreQuestionScreen.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const {question} = mock;
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = [false, true, false, false];

  const genreQuestionScreen = mount(
      <GenreQuestionScreen
        onAnswer={onAnswer}
        question={question}
        renderPlayer={() => {}}
        onChange={() => {}}
        userAnswers={userAnswer}
      />
  );

  const form = genreQuestionScreen.find(`form`);
  const inputTwo = genreQuestionScreen.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer.mock.calls[0][0]).toEqual(void 0);
  expect(genreQuestionScreen.find(`input`).map((it) => it.prop(`checked`))).toEqual(userAnswer);
});
