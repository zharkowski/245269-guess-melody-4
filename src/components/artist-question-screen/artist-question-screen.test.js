import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen";

const question = {
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
};

describe(`Render ArtistQuestionScreen`, () => {
  it(`Should ArtistQuestionScreen render correctly`, () => {
    const tree = renderer.create(
        <ArtistQuestionScreen
          question={question}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
