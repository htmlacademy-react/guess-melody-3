import {renderHook, act} from '@testing-library/react-hooks';
import {useUserAnswers} from './use-user-answers';

let questionMock = null;
describe('useUserAnswers tests', () => {
  beforeAll(() => {

    questionMock = {
      type: 'genre',
      genre: 'jazz',
      answers: [
        {
          genre: 'rock',
          src: '',
        },
        {
          genre: 'jazz',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
      ],
    };
  });

  it('useUserAnswers should return array with 3 elements', () => {
    const {result} = renderHook(() =>
      useUserAnswers(questionMock, jest.fn()),
    );

    const {current} = result;
    const [answers, handleAnswer, handleAnswerChange] = current;

    expect(current).toHaveLength(3);
    expect(answers).toBeInstanceOf(Array);
    expect(handleAnswer).toBeInstanceOf(Function);
    expect(handleAnswerChange).toBeInstanceOf(Function);
  });

  it('useUserAnswers should be correctly change state', () => {
    const {result} = renderHook(
      () => useUserAnswers(questionMock, jest.fn()),
    );

    const expectedInitialAnswers = [false, false, false, false];
    const [initialAnswers] = result.current;
    let [,, handleAnswerChange] = result.current;

    act(() => handleAnswerChange(1, true));

    [,, handleAnswerChange] = result.current;
    act(() => handleAnswerChange(3, true));

    const [answers] = result.current;
    expect(initialAnswers).toStrictEqual(expectedInitialAnswers);
    expect(answers[1]).toBe(true);
    expect(answers[3]).toBe(true);
  });

  it('useUserAnswers should be call onAnswer', () => {
    const onAnswer = jest.fn();
    const {result} = renderHook(() =>
      useUserAnswers(questionMock, onAnswer),
    );
    const [answers, handleAnswer] = result.current;
    handleAnswer();

    expect(onAnswer).toBeCalled();
    expect(onAnswer).toHaveReturnedWith(void 0);
    expect(onAnswer).toHaveBeenCalledWith(questionMock, answers);
  });
});
