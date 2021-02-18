import React from 'react';
import PropTypes from 'prop-types';

function Mistakes(props) {
  const {count} = props;

  const mistakes = new Array(count).fill('');

  return (
    <div className="game__mistakes">
      {mistakes.map((item, index) => {
        const keyValue = `mistake-${index}`;
        return <div key={keyValue} className="wrong" />;
      })}
    </div>
  );
}

Mistakes.propTypes = {
  count: PropTypes.number.isRequired,
};
export default Mistakes;
