const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');


const webAppUrl = 'https://thriving-florentine-2ed8c9.netlify.app';

const token='5820969307:AAGy6owHRqtUq4FrXLdE3ZfVLcHMdQmnGxY';
const token2='5981704565:AAHiVj3UGo-x8dfbze6ByAmXP9_7HIFEXIE';

const bot2 = new TelegramBot(token2, {polling: true});
const app=express();

app.use(express.json());
app.use(cors());

bot2.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text==='/start'){
    await bot2.sendMessage(chatId,'Hello everyone for this bot!',{
        reply_markup:{
            keyboard:[
                [{text:"Test this bot with me!",web_app:{url:webAppUrl+"/form"}}]
            ]
        }
    })
    await bot2.sendMessage(chatId,'Hello everyone for this bot!',{
        reply_markup:{
            inline_keyboard:[
                [{text:"Test this!", web_app:{url:webAppUrl}}]
            ]
        }
    })
  }
   
//   bot.sendMessage(chatId, 'Received your message');
});
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text==='/start'){
    await bot.sendMessage(chatId,'Hello everyone for this bot!',{
        reply_markup:{
            keyboard:[
                [{text:"Test this bot with me!",web_app:{url:webAppUrl+'/form'}}]
            ]
        }
    })
    await bot.sendMessage(chatId,'Hello everyone for this bot!',{
        reply_markup:{
            inline_keyboard:[
                [{text:"Test this!", web_app:{url:webAppUrl}}]
            ]
        }
    })
  }
   
  if(msg?.web_app_data?.data) {
    try{
        const data = JSON.parse(msg?.web_app_data?.data)
        console.log(data);
        await bot.sendMessage(chatId, "Have a problem!")
        await bot.sendMessage(chatId, "your country: "+data?.country);
        await bot.sendMessage(chatId, "your street: "+data?.street);


        setTimeout(async() =>{
            await bot.sendMessage(chatId, "your street: "+data?.street);
        },3000);
    }
    catch(e){
        console.log(e);
    }
  }

//   bot.sendMessage(chatId, 'Received your message');
});

app.post('/web-data', async(req,res)=>{
    const{queryId, products, totalPrice} = req.body;
    try{
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'your payment!',
            input_message_content:{message_text: 'this is your pay here:'+totalPrice}
        })
        return res.status(500).json({});
    }catch(e){
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'your payment!!!!',
            input_message_content:{message_text: 'this is your pay here::::'}
        })
        return res.status(500).json({});
    }
})

const PORT = 8000;
app.listen(PORT, ()=>console.log('server started on port '+PORT))