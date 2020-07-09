import React from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._audioRef = React.createRef();
    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;
    audio.src = src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => this.setState({
      isPlaying: true,
    });

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime,
    });
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    const {onPlayButtonClick} = this.props;
    const {src} = this.props;
    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {
            this.setState({isPlaying: !this.state.isPlaying});
            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          <audio
            src={src}
            ref={this._audioRef}
          />
        </div>
      </>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;
    if (this.state.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
