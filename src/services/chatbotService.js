require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = 'https://image.shutterstock.com/image-vector/bubble-milk-tea-design-collectionpearl-260nw-1789344617.jpg';
const IMAGE_MENU1 = 'https://cdn.dayphache.edu.vn/wp-content/uploads/2019/07/menu-dep-la-diem-cong-cho-quan.jpg';


let getUserName = (sender_psid) => {
         return new Promise((resolve, reject) => {
                  request({
                           "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
                           "method": "GET",
                         }, (err, res, body) => {
                           if (!err) {
                                    body = JSON.parse(body);
                                    // "first_name": "Peter",
                                    // "last_name": "Chang",
                                    let username = `${body.first_name} ${body.last_name}`;
                                    resolve(username);
                           } else {
                             console.error("Unable to send message:" + err);
                             reject(err);
                           }
         });   
       }); 
}

let callSendAPI = async  (sender_psid, response) => {
         // Construct the message body
  let request_body = {
         "recipient": {
           "id": sender_psid
         },
         "message": response
       }
     
       await typingonAPI(sender_psid);
       await sendMaskReadAPI(sender_psid);

       // Send the HTTP request to the Messenger Platform
       request({
         "uri": "https://graph.facebook.com/v14.0/me/messages",
         "qs": { "access_token": PAGE_ACCESS_TOKEN },
         "method": "POST",
         "json": request_body
       }, (err, res, body) => {
         if (!err) {
           console.log('message sent!')
         } else {
           console.error("Unable to send message:" + err);
         }
       }); 
};

let typingonAPI =  (sender_psid) => {
         // Construct the message body
  let request_body = {
         "recipient": {
           "id": sender_psid
         },
         "sender_action":"typing_on"
       }
     
       // Send the HTTP request to the Messenger Platform
       request({
         "uri": "https://graph.facebook.com/v9.0/me/messages",
         "qs": { "access_token": PAGE_ACCESS_TOKEN },
         "method": "POST",
         "json": request_body
       }, (err, res, body) => {
         if (!err) {
           console.log('typingonAPI sent!')
         } else {
           console.error("Unable to send typingonAPI:" + err);
         }
       }); 
};

let sendMaskReadAPI =  (sender_psid) => {
         // Construct the message body
  let request_body = {
         "recipient": {
           "id": sender_psid
         },
         "sender_action":"mark_seen"
       }
     
       // Send the HTTP request to the Messenger Platform
       request({
         "uri": "https://graph.facebook.com/v9.0/me/messages",
         "qs": { "access_token": PAGE_ACCESS_TOKEN },
         "method": "POST",
         "json": request_body
       }, (err, res, body) => {
         if (!err) {
           console.log('sendMaskReadAPI sent!')
         } else {
           console.error("Unable to send sendMaskReadAPI:" + err);
         }
       }); 
};


let handleGetstarted = (sender_psid) => {
         return new Promise(async(resolve, reject) => {
                  try{
                           let username = await getUserName(sender_psid);
                          
                           
                           let response2 = getStartedTemple();
                           let response1 = {"text": `Chào mừng ${username} đến với Koutea.`};

                           // Send text message
                           await callSendAPI(sender_psid, response1);
                           
                           // Send generic temple message
                           await callSendAPI(sender_psid, response2);

                           resolve('done');

                  }catch(e) {
                           reject(e);
                  }
         })
};
// menu temple
let getStartedTemple = () => {
         let     response = {
                  "attachment": {
                    "type": "template",
                    "payload": {
                      "template_type": "generic",
                      "elements": [{
                        "title": "K O U T E A Ⓡ",
                        "subtitle": "KOUTEAⓇ - Tiệm trà hoa quả trứ danh | Opentime Daily: 9:00 - 22:00 ",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                          {
                            "type": "web_url",
                            "title": "Bấm để đặt hàng ngay",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true //false: open windows in new tab
                          },
                  //         {
                  //           "type": "phone_number",
                  //           "title": "Gọi ngay !",
                  //           "payload": "+84949847888",
                  //         }
                        ],
                      }]
                    }
                  }
                };
         return response;
};
let getMenuTemple = () => {
         let response  ={
                  "attachment":{
                  "type":"image", 
                  "payload":{
                  "url": IMAGE_MENU1, 
                  "is_reusable":true
                  }
                  }
         }
         return response;
};
// let getbuttonMenuTemple = () => {
//          let response  ={
//                   "message":{
//                            "text":"hello, world!"
//                          }
//          };
//          return response;
// };
let handleSendMenu = (sender_psid) => {
         return new Promise(async(resolve, reject) => {
                  try{
                           let response1 = getMenuTemple();
                           // let response2 = {"text": "Hello Word !"}
                           await callSendAPI(sender_psid, response1);
                           // await callSendAPI(sender_psid, response2);
                           resolve('done');

                  }catch(e) {
                           reject(e);
                  }
         })
};

module.exports = {
         handleGetstarted: handleGetstarted,
         handleSendMenu: handleSendMenu
};