import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

describe(`Render WelcomeScreen`, () => {
  it(`Should WelcomeScreen render correctly`, () => {
    const tree = renderer.create(
        <WelcomeScreen
          errorsCount={3}
          welcomeButtonClickHandler={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
