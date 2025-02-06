import axios from "axios";

//axios instance create
const api= axios.create({
    baseURL:"https://v6.exchangerate-api.com/v6/3d951d74ad62b7bc50712932",
})


// get request for current exchange rate
export const currencyConvert= async (fromCurrency, toCurrency, amount)=>{
   const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
   // console.log(res.data);     // {result: 'success', documentation: 'https://www.exchangerate-api.com/docs', terms_of_use: 'https://www.exchangerate-api.com/terms', time_last_update_unix: 1736035201, time_last_update_utc: 'Sun, 05 Jan 2025 00:00:01 +0000',…}
   return res.data.conversion_result;    
}
