import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';

function NotFoundScreen() {
  return (
    <section className="game">
      <header className="game__header">
        <Logo />
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>
      </header>

      <section className="game__screen">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </section>
  );
}

export default NotFoundScreen;
