import React from 'react';
import {defaultCurrencies} from '../rates';

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur.slice(0,2))}
          className={currency === cur.slice(0,2) ? 'active' : ''}
          key={cur}>
          {cur}
        </li>
      ))}
    </ul>
    <div>
    <input
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      type='number'
      placeholder={0.000}
    />
    </div>
  </div>
);
