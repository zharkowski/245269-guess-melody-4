import React from "react";
import PropTypes from "prop-types";
import {GameMode} from "../../const";
import AudioPlayer from "../audio-player/audio-player.jsx";

class ArtistQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
    };
  }

  render() {
    const {isPlaying} = this.state;
    const {onAnswer, question} = this.props;
    const {song, answers} = question;
    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              isPlaying={isPlaying}
              src={song.src}
              onPlayButtonClick={() => this.setState({isPlaying: !isPlaying})}
            />
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, index) => {
            const {picture, artist} = answer;
            return (
              <div key={`${index}-${artist}`} className="artist">
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={`answer-${index}`}
                  id={`answer-${index}`}
                  onChange={(evt) => {
                    evt.preventDefault();
                    onAnswer(question, answer);
                  }}
                />
                <label className="artist__name" htmlFor={`answer-${index}`}>
                  <img className="artist__picture" src={picture} alt={artist}/>
                  {artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    mode: PropTypes.oneOf([GameMode.ARTIST, GameMode.GENRE]).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          artist: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
        })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArtistQuestionScreen;
