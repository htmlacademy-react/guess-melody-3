const AVATAR_URL = 'https://i.pravatar.cc/128';

const questions = [
  {
    type: 'genre',
    genre: 'rock',
    answers: [{
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'rock',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'blues',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'jazz',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'rock',
    }],
  }, {
    type: 'artist',
    song: {
      artist: 'Jim Beam',
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
    },
    answers: [{
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'John Snow',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jack Daniels',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jim Beam',
    }],
  },
];

export default questions;
