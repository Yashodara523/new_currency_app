import React,{useEffect,useState} from 'react';
import axios from 'axios';

export default function () {
    //states for the form fields
    const[date,setDate]=useState(null);
    const[sourceCurrency,setSourceCurrency]=useState("");
    const[targetCurrency,setTargetCurrency]=useState("");
    const[amountInSourceCurrency,setAmountInSourceCurrency]=useState(0);
    const[amountInTargetCurrency,setAmountInTargetCurrency]=useState(0);
    const[currencyNames,setCurrencyNames]=useState([]);
    const [loading,setLoading]=useState(true);
    //handlesubmit method
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency
        );
        try{
          const responce =await axios.get("http://localhost:5000/convert",{params:{
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
        },
          });
          //todo: set the rest.........
          setAmountInSourceCurrency(responce.data);
          setLoading(false);

        }catch(err){
        console.error(err);
        }
    };
    //get all currency names
    useEffect(()=>{
      const getCurrencyNames=async()=>{
        try{
          const responce = await axios.get("http://localhost:5000/getAllCurrencies");
          setCurrencyNames(responce.data);
        }catch(err){
          console.error(err);
        }
      };
      getCurrencyNames();
    },[]);
  return (
    <div>
        <h1 className="lg:mx-32 text-5xl font-bold text-green-500">Convert Your Currencies Today</h1>
        <p className="lg:mx-32 opacity-40 py-6">
        "Unlock the power of seamless currency conversion with our app 'Convert Your Currencies Today.' Whether you're a globetrotter, business professional, or just managing international transactions, our user-friendly app provides real-time exchange rates, ensuring you always get the best value. Effortlessly convert between currencies, stay informed with up-to-the-minute rates, and streamline your financial transactions. Download now and experience the convenience of currency conversion at your fingertips."
        </p>

        <div className="mt-5 flex items-center justify-center flex-col ">
            <section className="w-full lg:w-1/2 ">
                <form onSubmit={handlesubmit}>
                <div className="mb-4">
    <label htmlFor={date} className="block mb-2 text-sm font-medium text-white dark:text-white">Date</label>
    <input 
    onChange={(e)=>setDate(e.target.value)}
    type="date" 
    id={date}
    name={date}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-4">
    <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-white dark:text-white">Source currency</label>

    <select 
    onChange={(e)=>setSourceCurrency(e.target.value)}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
    name={sourceCurrency} 
    id={sourceCurrency}
    value={sourceCurrency}>
    
        <option value="">Select source currency</option>
        {Object.keys(currencyNames).map((currency) => (
    <option className="p-1" key={currency} value={currency}>
      {currencyNames[currency]}
    </option>
  ))}
    </select>
  </div>
                  
  <div className="mb-4">
    <label htmlFor={targetCurrency}
    className="block mb-2 text-sm font-medium text-white dark:text-white">Target currency</label>

    <select 
    onChange={(e)=>setTargetCurrency(e.target.value)}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
    name={targetCurrency}
    id={targetCurrency}
    value={targetCurrency}
    >
        <option value="">Select target currency</option>
        {Object.keys(currencyNames).map((currency) => (
    <option className="p-1" key={currency} value={currency}>
      {currencyNames[currency]}
    </option>
  ))}
    </select>
  </div>
  <div className="mb-4">
    <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-white dark:text-white">Amount in source currency</label>
    <input 
    onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
    type="text" id={amountInSourceCurrency}
    name={amountInSourceCurrency}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="1000" required/>
  </div>
    <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
        {""}
        Get the target currency</button>
                </form>
            </section>
        </div>
        {!loading ?(<section className="mt-5"> 
        {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "}
        <span className=" lg:mx-60 text-green-500 font-bold">{amountInTargetCurrency}</span>{currencyNames[targetCurrency]}
        </section>):null}
        
        
    </div>
    
  )
}
