import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  }
};

it(`Click by Play button should toggle isPlaying state`, () => {
  const {song} = mock;

  const audioPlayer = shallow(
      <AudioPlayer
        isPlaying={false}
        src={song.src}
      />
  );

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};
  const button = audioPlayer.find(`.track__button`);
  button.simulate(`click`);
  expect(audioPlayer.state().isPlaying).toEqual(true);
  button.simulate(`click`);
  expect(audioPlayer.state().isPlaying).toEqual(false);
});
