import React from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent {
    constructor(props) {
      super(props);
      this._audioRef = React.createRef();
      this.state = {
        progress: 0,
        isLoading: true,
        isPlayingReal: props.isPlaying,
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
        isPlayingReal: true,
      });

      audio.onpause = () => this.setState({
        isPlayingReal: false,
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
      const {isLoading, isPlayingReal} = this.state;
      const {onPlayButtonClick} = this.props;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlayingReal}
          onPlayButtonClick={() => {
            this.setState({isPlayingReal: !isPlayingReal});
            onPlayButtonClick();
          }}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;
      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  return WithAudio;
};

export default withAudio;
