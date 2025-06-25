import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { compileString } from 'sass';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_RESET = '';
const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [showResetButton, setShowResetButton] = useState(false);
  const [stateReverse, setStateReverse] = useState(false);

  // eslint-disable-next-line default-case
  switch (sortField) {
    case SORT_FIELD_NAME:
      goods.sort((good1, good2) => good1.localeCompare(good2));
      if (stateReverse) goods.reverse();
      break;
    case SORT_FIELD_LENGTH:
      goods.sort((good1, good2) => good1.length - good2.length);
      if (stateReverse) goods.reverse();
      break;
    case SORT_FIELD_REVERSE:
      goods.reverse();
      break;
  }

  function handleButton(field) {
    setSortField(field);

    if (field !== SORT_FIELD_RESET) {
      setShowResetButton(true);
    }

    if (field === SORT_FIELD_REVERSE) {
      setStateReverse(stateReverse === false);
    }
  }

  function setReset() {
    setSortField(SORT_FIELD_RESET);
    setGoods([...goodsFromServer]);
    setShowResetButton(false);
    setStateReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleButton(SORT_FIELD_NAME)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleButton(SORT_FIELD_LENGTH)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => handleButton(SORT_FIELD_REVERSE)}
          className={classNames('button is-info', {
            'is-light': !stateReverse,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            onClick={setReset}
            className={classNames('button is-info', {
              'is-light': sortField !== SORT_FIELD_RESET,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
