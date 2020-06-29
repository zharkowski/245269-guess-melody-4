import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`WelcomeScreen e2e test`, () => {
  it(`Should welcome button be pressed`, () => {
    const welcomeButtonClickHandler = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsCount={3}
          welcomeButtonClickHandler={welcomeButtonClickHandler}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);
    welcomeButton.props().onClick();
    expect(welcomeButtonClickHandler.mock.calls.length).toBe(1);
  });
});
