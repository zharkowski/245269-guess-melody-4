import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`Render App`, () => {
  it(`Should App render correctly`, function () {
    const tree = renderer.create(
        <App errorsCount={3}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
