const axios = require('axios');
const fs = require("fs");

const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n');

let arraySite = readFileLines('site.txt');
let params = readFileLines('params.txt');
let keyApi = params[0];
let email =params[1];
let idAccount=params[2];
let ipSite = params[3];

for (let i =0; i<arraySite.length;i++){
    addSite(keyApi,email,idAccount,arraySite[i]);
}



function addSite(key,email,idAccount,nameSite){
    axios({
        method: 'post',
        headers: {
            'X-Auth-Key': key,
            "X-Auth-Email": email 
        },
        url: 'https://api.cloudflare.com/client/v4/zones',
        data: {
            account: {
                id: idAccount
            },
            name: nameSite,
            jump_start: true
        }
    }).then((response) => {
        // console.log(response);
        console.log(response.data.result.id);
        let idSite= response.data.result.id;
        let recordA =['www'];
        recordA.push[nameSite]
        
        for(let i =0; i<=recordA.length; i++){
            addRecords(key,email,idSite,recordA[i],ipSite);
        }
        // onHttps(key,email,idSite);
        // listZone(key,email,nameSite,idAccount)
        
    }, (error) => {
        console.log(error);
    });
    
}
    



function addRecords(key,email,idSite,type,ipSite){
    axios({
        method: 'post',
        headers: {
            'X-Auth-Key': key,
            "X-Auth-Email": email ,
            "Content-Type": "application/json" 
        },
        url: `https://api.cloudflare.com/client/v4/zones/${idSite}/dns_records`,
        data: {
            "type":"A",
            "name": type,
            "content":ipSite,
            "ttl":3600,
            "priority":10,
            "proxied":true
        }
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

// function onHttps(key,email,idSite){
//     axios({
//         method: 'post',
//         headers: {
//             'X-Auth-Key': key,
//             "X-Auth-Email": email ,
//             "Content-Type": "application/json" 
//         },
//         url: `https://api.cloudflare.com/client/v4/zones/${idSite}/settings/automatic_https_rewrites`,
//         data: {
//             "value":"on"
//         }
//     }).then((response) => {
//         console.log(response);
//     }, (error) => {
//         console.log(error);
//     });
// }

// function listZone(key,email,nameSite,idAccount){
//     axios({
//         method: 'get',
//         headers: {
//             'X-Auth-Key': key,
//             "X-Auth-Email": email ,
//             "Content-Type": "application/json" 
//         },
//         url: `https://api.cloudflare.com/client/v4/zones?name=${nameSite}&account.id=${idAccount}`,
        
//     }).then((response) => {
//         console.log(response);
//     }, (error) => {
//         console.log(error);
//     });
// }

