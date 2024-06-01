const express=require("express");
const cors=require("cors");
const axios=require("axios");

const app=express(); 

//middle wares
app.use(express.json());
app.use(cors());

//all currences
app.get("/getAllCurrencies",async ( _req, res)=>{
const nameURL =`https://openexchangerates.org/api/currencies.json?app_id=879d051975454856adb09dbb67adca01`;


try{

const namesResponce = await axios.get(nameURL);
const nameData=namesResponce.data;

return res.json(nameData);

}catch(err){
console.error(err);
}
});
//get the target amount
app.get("/convert", async(req,res)=>{
const{       date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency
}=req.query;
try{
const dataUrl=`https://openexchangerates.org/api/historical/${date}.json?app_id=879d051975454856adb09dbb67adca01`;
const dataResponce = await axios.get(dataUrl);
const rates=dataResponce.data.rates;

//rates
const sourceRet=rates[sourceCurrency];
const targetRet=rates[targetCurrency];

//final target value

const targetAmount=(targetRet/sourceRet)*amountInSourceCurrency;

return res.json(targetAmount.toFixed(2));

}catch(err){
    console.error(err);
}

})

//listen to a port
app.listen( 5000,()=>{
    console.log("SERVER STARTED");
});
