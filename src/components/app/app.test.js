import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configurateStore from "redux-mock-store";

const mockStore = configurateStore([]);

const questions = [{
  mode: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `https://api.adorable.io/avatars/128/1`,
    artist: `John Snow`,
  }, {
    picture: `https://api.adorable.io/avatars/128/2`,
    artist: `Jack Daniels`,
  }, {
    picture: `https://api.adorable.io/avatars/128/3`,
    artist: `Jim Beam`,
  }],
}, {
  mode: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
}];

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, function () {
    const store = mockStore({
      mistakes: 0,
    });
    const tree = renderer.create(
        <Provider store={store}>
          <App
            errorsCount={3}
            questions={questions}
            onWelcomeButtonClick={() => {}}
            onUserAnswer={() => {}}
            step={-1}
            maxMistakes={3}
            mistakesCount={0}
            resetGame={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });
    const tree = renderer.create(
        <Provider store={store}>
          <App
            errorsCount={3}
            questions={questions}
            onUserAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            step={0}
            maxMistakes={3}
            mistakesCount={0}
            resetGame={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });
    const tree = renderer.create(
        <Provider store={store}>
          <App
            errorsCount={3}
            questions={questions}
            onUserAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            step={1}
            maxMistakes={3}
            mistakesCount={0}
            resetGame={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GameOverScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakes={3}
              questions={questions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={1}
              mistakesCount={3}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render WinScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakes={3}
              questions={questions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={3}
              mistakesCount={0}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
