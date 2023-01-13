import React from 'react';
import Select from 'react-select'
import style from './style.module.css'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { IconButton } from '@mui/material';


function CurrencySelection(props){
    const {
        from,
        to,
        options,
        onChangeFrom,
        onChangeTo,
        onSwitchCurrency
    } = props
    return(
        <div className={style['currency-block']}>
            <Select 
                placeholder='From'
                onChange={onChangeFrom}
                defaultValue={from} 
                options={options} 
            />
            <IconButton onClick={onSwitchCurrency} aria-label='switch'>
                <SwapHorizIcon />
            </IconButton>
            <Select 
                placeholder='To'
                onChange={onChangeTo}
                defaultValue={to} 
                options={options} 
            />
        </div>
    )
}

export default CurrencySelection