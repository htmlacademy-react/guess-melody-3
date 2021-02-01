import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';

function App(props) {
  const {errorsCount} = props;

  return (
    <WelcomeScreen errorsCount={errorsCount} />
  );
}

export default App;
