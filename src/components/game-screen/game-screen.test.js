import React from "react";
import renderer from "react-test-renderer";
import GameScreen from "./game-screen.jsx";
import {GameMode} from "../../const.js";


const children = <div className="children-component" />;

describe(`GameScreen component render correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const tree = renderer.create(
        <GameScreen
          mode={GameMode.ARTIST}
        >
          {children}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with type GameType.GENRE`, () => {
    const tree = renderer.create(
        <GameScreen
          mode={GameMode.GENRE}
        >
          {children}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
