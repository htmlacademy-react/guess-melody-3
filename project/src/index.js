import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app';
import questions from './mocks/questions';
import {reducer} from './store/reducer';

const Setting = {
  ERRORS_COUNT: 3,
};

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        errorsCount={Setting.ERRORS_COUNT}
        questions={questions}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
