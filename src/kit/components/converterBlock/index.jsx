import React, { useEffect, useState } from "react";
import CurrencySelection from '../currency-selections/index.jsx';
import { TextField } from '@mui/material';
import getSymbolFromCurrency from 'currency-symbol-map';
import style from './style.module.css';


const BASE_URL = 'https://api.apilayer.com/fixer/symbols'
const CONVERT_URL = (from, to, amount) => `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`
const API_KEY = 'h1qwGakqAWCsF9zgVZAv9X5LMh4AJD2P'

const REQUEST_HEADERS = {
  method: 'GET',
  headers: new Headers({
    apikey: API_KEY
  })
}

function ConverterBlock() {
  const [input, setInput] = useState('')
  const [res, setRes] = useState({
    amount:'',
    symbols:''
  })
  const [rates, setRates] = useState([])
  const [fromRates, setFromRates] = useState(null)
  const [toRates, setToRates] = useState(null)

  const handleInputChange = (ev) => {
    setInput(ev.target.value)
  }

  const handleChangeFrom = (option) => {
    setFromRates(option)
  }

  const handleChangeTo = (option) => {
    setToRates(option)
  }

  const handleSwitchCurrency =() => {
    console.log('click on the switch')
  }

  const handleClickConvert = async () => {
    try {
      const res = await fetch(CONVERT_URL(fromRates.value, toRates.value, input), REQUEST_HEADERS)
      const data = await res.json()
      setRes({
        amount: data.result,
        symbols: getSymbolFromCurrency(toRates)
      })
    } catch(e) {

    }
    console.log(res, 'res')
  }

  const fetchRates = async () => {
    try {
      const res = await fetch(BASE_URL, REQUEST_HEADERS)
      const data = await res.json()
      return data
    } catch (e) {
      console.log(e, 'Error')
    }}

  useEffect(() => {
    (async () => {
      const data = await fetchRates()
      const rates = Object.keys(data.symbols).map(item => ({
        label: item,
        value: item
      }))
      setRates(rates)
    })()
  }, [])

  return (
    <div>
      <h2 className={style['title']}>Simply Current Converter</h2>
      <div className={style['converter-block']}>
        <h2 className={style['exchange-title']}>Exchange Rate</h2>
        <h2 className={style['result']}>
          {res.amount}{res.symbols}
        </h2>
        <TextField 
          type='number' 
          label='amount' 
          fullWidth
          value={input}
          onChange={handleInputChange}
        />
        <CurrencySelection 
          from={fromRates}
          to={toRates}
          options={rates}
          onChangeFrom={handleChangeFrom}
          onChangeTo={handleChangeTo}
          onSwitchCurrency={handleSwitchCurrency}
        />
        <button 
          onClick={handleClickConvert}
          className={style['btn']}
        >
          CONVERT
        </button>
      </div>
    </div>
  );
}

export default ConverterBlock
