import { useState } from 'react'
import './App.css'
import { currencyConvert } from './axiosApi';
import { useQuery } from '@tanstack/react-query';

function App() {

  const[amount,setAmount]=useState(0);
  const[fromCurrency,setFromCurrency]=useState("USD");
  const[toCurrency, setToCurrency]=useState("INR");

 
  // useQuery hook use for get req
  const{data:convertedAmount, isLoading, error, isError, refetch}= useQuery({     //^ data - o/p data get after api call (here we assign alias name of data that is convertedAmount)        // refetch use for fetch queryFn when refetch call
    queryKey:['currency'],  // unique key which define which query fire
    queryFn:()=>currencyConvert(fromCurrency, toCurrency, amount),
    enabled:false,                   // by default api not call for first time         //^ enabled:true,  for first time api by default call      
   })

   const handleCurrencyConvert=()=>{
     if(amount>0){
        refetch();                 //when button click refetch call the queryFn 
      }
   }

   console.log(convertedAmount);
   return (
    <>
      <div className="app-container">
        <div className="currency-converter">
          <h1 className="title">Currency Converter</h1>
          <hr />
          <div className="input-container">
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="amount-input" 
            />
            <hr />
            <div className='container'>
            <label htmlFor="from" className="currency-label">From :</label>
            <select 
              value={fromCurrency} 
              onChange={(e) => setFromCurrency(e.target.value)} 
              id="from" 
              className="currency-select"
            >
              {["USD", "EUR", "INR", "GBP", "AUD"].map((currency) => {
                return <option value={currency} key={currency}>{currency}</option>
              })}
            </select>
            </div>

            <div className='container'>
            <label htmlFor="to" className="currency-label">To :</label>
            <select 
              value={toCurrency} 
              onChange={(e) => setToCurrency(e.target.value)} 
              id="to" 
              className="currency-select"
            >
              {["INR", "EUR", "USD", "GBP", "AUD"].map((currency) => {
                return <option value={currency} key={currency}>{currency}</option>
              })}
            </select>
            </div>
          </div>

          <button 
            onClick={handleCurrencyConvert} 
            disabled={isLoading || amount <= 0} 
            className="convert-btn"
          >
            {isLoading ? "Converting" : "Convert"}
          </button>
          <hr />
          {convertedAmount && 
            <h2 className="result">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </h2>
          }
          {isError && <p className="error-message">An error occurred : {error.message}</p>}
        </div>
      </div>
    </>
  )
}

export default App;