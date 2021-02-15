import React, {Fragment, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

function AudioPlayer({isPlaying, src, onPlayButtonClick}) {
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.onloadeddata = () => setIsLoading(false);

    return () => {
      if (audioRef.current) {
        audioRef.current.onloadeddata = null;
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  return (
    <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? 'pause' : 'play'}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        <audio src={src} ref={audioRef} />
      </div>
    </Fragment>
  );
}

AudioPlayer.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
