import React from 'react';
import {render} from '@testing-library/react';
import Mistakes from './mistakes';

const count = 3;

test('Should Mistakes render correctly', () => {
  const {container} = render(<Mistakes count={count} />);
  expect(container).toMatchSnapshot();
});
