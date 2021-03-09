import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import withAudioPlayer from './with-audio-player';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen';

jest.mock('../../components/audio-player/audio-player', () => {
  const mockAudioPlayer = () => <>This is mock AudioPlayer</>;
  mockAudioPlayer.displayName = 'MockAudioPlayer';
  return {
    __esModule: true,
    default: () => mockAudioPlayer(),
  };
});

describe('Test HOC "withAudioPlayer"', () => {
  it('Base component should be correct rendering when use with HOC', () => {
    function BaseComponent() {
      return <h1>withAudioPlayer</h1>;
    }

    const BaseComponentWrapped = withAudioPlayer(BaseComponent);

    render(<BaseComponentWrapped />);

    expect(screen.getByText(/withAudioPlayer/i)).toBeInTheDocument();
  });

  it('Base component should be correct rendering another component with render-prop when use with HOC', () => {
    const mockQuestion = {
      type: 'artist',
      song: {
        artist: 'Bon Jovi',
        src: 'path',
      },
      answers: [
        {
          artist: 'Bon Jovi',
          picture: 'picture',
        },
        {
          artist: 'Cinderella',
          picture: 'picture',
        },
        {
          artist: 'Skid Row',
          picture: 'picture',
        },
      ],
    };
    const history = createMemoryHistory();
    const BaseComponentWrapped = withAudioPlayer(ArtistQuestionScreen);
    render(
      <Router history={history}>
        <BaseComponentWrapped
          onAnswer={jest.fn()}
          question={mockQuestion}
        >
          <p>This is children component</p>
        </BaseComponentWrapped>
      </Router>,
    );

    expect(screen.getByText(/This is children component/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock AudioPlayer/i)).toBeInTheDocument();
    expect(screen.getByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Cinderella/i)).toBeInTheDocument();
  });
});
