import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Block } from './components/Block';
import './index.scss';

function App() {
  const userLanguageRef = useRef('');
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  
  useEffect(() => {
    userLanguageRef.current = window.navigator.language.slice(-2).toUpperCase();
    setFromCurrency(userLanguageRef.current);
  },[]);


  const onChangeFromPrice = useCallback((value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  },[fromCurrency, toCurrency]);

  const onChangeToPrice = useCallback((value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  },[fromCurrency, toCurrency]);

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      Object.keys(ratesRef.current).forEach(el => {
        delete Object.assign(ratesRef.current, {[el.slice(0,2)]: ratesRef.current[el]})[el];
      });
      userLanguageRef.current = window.navigator.language.slice(-2).toUpperCase();
      setFromPrice('');
      setToPrice('');
    })
    .catch(err => {
      console.warn(err);
      alert('No data');
    });
  }, []);

  useEffect(() => {
    onChangeToPrice(toPrice);
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice, onChangeFromPrice, onChangeToPrice, toCurrency, toPrice]);



  return (
    <div className="App">
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice}
      />
     <Block 
      value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} 
      onChangeValue={onChangeToPrice}
      />
    </div>
  );
};

export default App;
