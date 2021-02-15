import React, {useState} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player';

const withActivePlayer = (Component) => {
  function WithActivePlayer(props) {
    const [activePlayerId, setActivePlayerId] = useState(0);
    return (
      <Component
        {...props}
        renderPlayer={(src, id) => (
          <AudioPlayer
            src={src}
            isPlaying={id === activePlayerId}
            onPlayButtonClick={() => {
              setActivePlayerId(activePlayerId === id ? -1 : id);
            }}
          />
        )}
      />
    );
  }

  return WithActivePlayer;
};

export default withActivePlayer;
