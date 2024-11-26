import classNames from 'classnames';
import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

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

const sortGoods = (goods, params) => {
  const copyGoods = [...goods];
  const { sortedBy, isReversed } = params;

  if (sortedBy !== '') {
    copyGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case 'byAlphabet':
          return good1.localeCompare(good2);
        case 'byLength':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const handleReset = () => {
    setSortedBy('');
    setIsReversed(false);
    setHasChanged(false);
  };

  const sortedGoods = sortGoods(goodsFromServer, {
    sortedBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortedBy('byAlphabet');
            setHasChanged(true);
          }}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== 'byAlphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortedBy('byLength');
            setHasChanged(true);
          }}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== 'byLength',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
            setHasChanged(sortedBy !== '' || !isReversed);
          }}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {hasChanged && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
