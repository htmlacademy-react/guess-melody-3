export const isArtistAnswerCorrect = (question, userAnswer) =>
  userAnswer.artist === question.song.artist;

export const isGenreAnswerCorrect = (question, userAnswer) =>
  userAnswer.every((answer, index) =>
    answer === (question.answers[index].genre === question.genre));
