import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import questions from './mocks/questions';
import {reducer} from './store/reducer';

const Setting = {
  ERRORS_COUNT: 3,
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);
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
